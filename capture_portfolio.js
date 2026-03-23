import puppeteer from 'puppeteer';

(async () => {
  const websites = [
    { url: 'https://putrakaryapallet.com/', filename: 'putrakarya.png' },
    { url: 'https://aurobarbers.web.id/', filename: 'aurobarbers.png' },
    { url: 'https://doni-wahyudi.github.io/bimbel_web/', filename: 'bimbel_web.png' }
  ];

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });

  for (const site of websites) {
    console.log(`Navigating to ${site.url}...`);
    const page = await browser.newPage();
    const START_VH = 900;
    await page.setViewport({ width: 1440, height: START_VH });
    
    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 90000 });
      
      console.log('Scrolling page to trigger lazy loading...');
      await page.evaluate(async () => {
          await new Promise((resolve) => {
              let totalHeight = 0;
              const distance = 300;
              const timer = setInterval(() => {
                  const scrollHeight = document.body.scrollHeight;
                  window.scrollBy(0, distance);
                  totalHeight += distance;
                  
                  if (totalHeight >= scrollHeight - window.innerHeight) {
                      clearInterval(timer);
                      resolve();
                  }
              }, 400); 
          });
      });
      
      console.log('Scroll complete, waiting for images to load...');
      await new Promise(r => setTimeout(r, 3000));
      
      console.log('Freezing vh elements to prevent stretching...');
      await page.evaluate((vh) => {
          document.querySelectorAll('*').forEach(el => {
              const h = el.clientHeight;
              // If an element takes roughly the full viewport height, freeze it to pixels
              if (h >= vh * 0.8 && h <= vh * 1.5) { 
                  el.style.height = h + 'px';
                  el.style.minHeight = h + 'px';
                  el.style.maxHeight = h + 'px';
              }
          });
      }, START_VH);

      // Resize viewport to full height
      const bodyHandle = await page.$('body');
      const boundingBox = await bodyHandle.boundingBox();
      await bodyHandle.dispose();
      
      if (boundingBox) {
          console.log(`Resizing viewport to full height: ${boundingBox.height}px`);
          await page.setViewport({ width: 1440, height: Math.max(START_VH, Math.ceil(boundingBox.height)) });
      }
      
      console.log('Waiting for layout shifts...');
      await new Promise(r => setTimeout(r, 4000));
      
      const path = `./src/assets/portfolio/${site.filename}`;
      await page.screenshot({ path: path, fullPage: true });
      console.log(`Saved screenshot to ${path}`);
    } catch (error) {
      console.error(`Failed to capture ${site.url}:`, error.message);
    }
    
    await page.close();
  }

  await browser.close();
  console.log('Semua capture selesai.');
})();
