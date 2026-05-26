import ftp, { enterPassiveModeIPv4 } from 'basic-ftp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to scan all files inside the compiled 'dist' folder recursively
function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const absolutePath = path.join(dir, file);
    if (fs.statSync(absolutePath).isDirectory()) {
      getFilesRecursively(absolutePath, fileList);
    } else {
      fileList.push(absolutePath);
    }
  }
  return fileList;
}

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true; // Shows exact FTP logs in GitHub Action console

  // Force standard IPv4 PASV mode (prevents cPanel firewall drops on Extended Passive Mode EPSV)
  client.ftp.ipFamily = 4;
  client.prepareTransfer = enterPassiveModeIPv4;

  try {
    console.log("Connecting to FTP server...");
    await client.access({
      host: process.env.FTP_SERVER,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      port: 21,
      secure: false // Force plain FTP to bypass cPanel TLS session reuse failures
    });

    console.log("Connected successfully.");

    const localDir = path.join(__dirname, 'dist');
    const remoteDir = 'public_html';
    const allFiles = getFilesRecursively(localDir);

    console.log(`Found ${allFiles.length} files to upload. Starting rate-limited sequential upload...`);

    for (const filePath of allFiles) {
      // Return to FTP root at the start of each file to ensure paths are absolute
      await client.cd("/");

      // Calculate path relative to 'dist' folder
      const relativePath = path.relative(localDir, filePath).replace(/\\/g, '/');
      const remotePath = `${remoteDir}/${relativePath}`;
      const remoteParentDir = path.dirname(remotePath);
      const fileName = path.basename(filePath);

      // Ensure target remote directory exists and move client into it
      console.log(`Ensuring directory exists: ${remoteParentDir}`);
      await client.ensureDir(remoteParentDir);

      // Upload file directly into the current working directory
      console.log(`Uploading: ${relativePath} -> ${remotePath}`);
      await client.uploadFrom(filePath, fileName);

      // Add a 1000ms (1 second) delay to prevent cPanel firewall rate-limit bans
      console.log("Waiting 1 second before next transfer to cooldown firewall...");
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("Deployment completed successfully! 🎉");
  } catch (err) {
    console.error("FTP Deployment Error:", err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
