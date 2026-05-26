import ftp from 'basic-ftp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true; // Shows exact file upload logs in GitHub Actions

  // Force standard IPv4 PASV mode (prevents cPanel firewall drops on Extended Passive Mode EPSV)
  client.ftp.ipFamily = 4;
  client.prepareTransfer = client.enterPassiveModeIPv4.bind(client);

  try {
    console.log("Connecting to FTP server...");
    await client.access({
      host: process.env.FTP_SERVER,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      port: 21,
      secure: false // Force plain FTP to bypass cPanel TLS session reuse failures
    });

    console.log("Connected successfully. Starting sequential upload...");
    
    // Upload the compiled 'dist' folder directly to 'public_html'
    await client.uploadFromDir(path.join(__dirname, 'dist'), 'public_html');
    
    console.log("Deployment completed successfully! 🎉");
  } catch (err) {
    console.error("FTP Deployment Error:", err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
