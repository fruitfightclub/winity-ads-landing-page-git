import { chromium } from 'playwright';
import path from 'path';

const url = 'http://localhost:3000';
const artifactDir = 'C:\\Users\\Disistripsy\\.gemini\\antigravity-ide\\brain\\848f47cf-555a-415f-824d-a269de0ecb6c';

async function capture() {
  const browser = await chromium.launch({ channel: 'chrome' });
  const context = await browser.newContext();

  let page = await context.newPage();
  // Set height to 600px to simulate short viewport
  await page.setViewportSize({ width: 1280, height: 600 });
  await page.goto(url);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactDir, 'desktop_home_short.png') });

  await page.close();
  await browser.close();
  console.log('Short viewport capture done!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
