import puppeteer from 'puppeteer';
import path from 'path';

async function capture() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport for a nice screenshot
  await page.setViewport({ width: 1280, height: 1600 });
  
  console.log('Navigating to http://glowmart.my.id/...');
  await page.goto('http://glowmart.my.id/', { waitUntil: 'networkidle0' });
  
  const outputPath = path.resolve('src/assets/portfolio/glowmart.webp');
  console.log(`Saving screenshot to ${outputPath}...`);
  
  await page.screenshot({ 
    path: outputPath, 
    type: 'webp',
    fullPage: false // Usually portfolio images are just the top fold or a specific height
  });
  
  await browser.close();
  console.log('Screenshot captured successfully!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
