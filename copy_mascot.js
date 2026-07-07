import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    src: "C:/Users/22036590/.gemini/antigravity-ide/brain/b5b03c80-fb1f-45bb-a4a6-e453689863a8/cyber_owl_waving_1783410135522.png",
    dest: "mascot_waving.png"
  },
  {
    src: "C:/Users/22036590/.gemini/antigravity-ide/brain/b5b03c80-fb1f-45bb-a4a6-e453689863a8/cyber_owl_faq_1783410146241.png",
    dest: "mascot_faq.png"
  },
  {
    src: "C:/Users/22036590/.gemini/antigravity-ide/brain/b5b03c80-fb1f-45bb-a4a6-e453689863a8/cyber_owl_services_1783410156432.png",
    dest: "mascot_services.png"
  }
];

const destDir = path.join(__dirname, 'src', 'assets');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

images.forEach(img => {
  try {
    if (!fs.existsSync(img.src)) {
      console.error(`Source file not found at: ${img.src}`);
      return;
    }
    const target = path.join(destDir, img.dest);
    fs.copyFileSync(img.src, target);
    console.log(`Successfully copied to: ${target}`);
  } catch (err) {
    console.error(`Failed to copy ${img.dest}:`, err);
  }
});
