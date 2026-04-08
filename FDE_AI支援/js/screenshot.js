const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const outputDir = path.join(__dirname, '..', 'docs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'accenture_ms_fde_screenshot.png');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('https://consulportal.com/news/consulting-67/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: outputPath, fullPage: false });
  await browser.close();
  console.log('Screenshot saved to:', outputPath);
})();
