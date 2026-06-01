import puppeteer from 'puppeteer';

(async () => {
  const websites = [
    { url: 'https://tanyaadvokat.id', filename: 'tanyaadvokat.webp' },
    { url: 'http://localhost:5174/', filename: 'bimbel_junior.webp' },
    { url: 'https://intanmiracle.com', filename: 'intanmiracle.webp' },
    { url: 'https://aurobarbers.web.id/', filename: 'aurobarbers.webp' },
    { url: 'https://putrakaryapallet.com/', filename: 'putrakarya.webp' },
    { url: 'http://glowmart.my.id/', filename: 'glowmart.webp' },
    { url: 'https://aurotechbimbel.my.id/', filename: 'bimbel_web.webp' },
    { url: 'https://aurotechklinik.my.id/', filename: 'clinic.webp' },
    { url: 'https://aurotechrental.my.id/', filename: 'rental.webp' },
    { url: 'https://aurotechbakery.my.id/', filename: 'bakery.webp' },
    { url: 'https://bagaspramono.web.id/', filename: 'bagaspramono.webp' }
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
      
      console.log('Waiting for initial page load and assets...');
      if (site.filename === 'bimbel_junior.webp') {
        // Wait for the hero image to render and be visible
        await page.waitForSelector('.hero-image.active', { timeout: 30000 });
        await new Promise(r => setTimeout(r, 6000));
      } else if (site.filename === 'intanmiracle.webp') {
        // Wait for main hero images
        await page.waitForSelector('img', { timeout: 30000 });
        await new Promise(r => setTimeout(r, 6000));
      } else {
        await new Promise(r => setTimeout(r, 3000));
      }
      
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

      if (site.filename === 'bimbel_junior.webp') {
        console.log('Forcing first hero image active and stripping GPU composition layers...');
        await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('.hero-image'));
          images.forEach((img, idx) => {
            if (idx === 0) {
              img.style.setProperty('opacity', '1', 'important');
              img.style.setProperty('display', 'block', 'important');
              img.style.setProperty('visibility', 'visible', 'important');
              img.style.setProperty('position', 'relative', 'important');
              img.style.setProperty('transition', 'none', 'important');
              img.style.setProperty('animation', 'none', 'important');
              img.style.setProperty('transform', 'none', 'important');
              img.style.setProperty('box-shadow', 'none', 'important');
              img.classList.add('active');
            } else {
              img.style.setProperty('opacity', '0', 'important');
              img.style.setProperty('display', 'none', 'important');
              img.style.setProperty('visibility', 'hidden', 'important');
              img.style.setProperty('position', 'absolute', 'important');
              img.style.setProperty('transition', 'none', 'important');
              img.style.setProperty('animation', 'none', 'important');
              img.style.setProperty('transform', 'none', 'important');
              img.classList.remove('active');
            }
          });
          
          const ill = document.querySelector('.hero-illustration');
          if (ill) {
            ill.style.setProperty('animation', 'none', 'important');
            ill.style.setProperty('transform', 'none', 'important');
            ill.style.setProperty('transition', 'none', 'important');
          }
          
          const wrapper = document.querySelector('.hero-image-wrapper');
          if (wrapper) {
            wrapper.style.setProperty('animation', 'none', 'important');
            wrapper.style.setProperty('transform', 'none', 'important');
            wrapper.style.setProperty('transition', 'none', 'important');
            wrapper.style.setProperty('overflow', 'visible', 'important');
            wrapper.style.setProperty('box-shadow', 'none', 'important');
          }

          const glow = document.querySelector('.hero-image-glow');
          if (glow) {
            glow.style.setProperty('display', 'none', 'important');
          }
        });
      }
      
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
      const height = boundingBox ? Math.ceil(boundingBox.height) : 2500;
      await bodyHandle.dispose();
      
      console.log(`Resizing viewport to full height: ${height}px`);
      await page.setViewport({ width: 1440, height: Math.max(START_VH, height) });
      
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
