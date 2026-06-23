const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log("================================================================================");
  console.log("✦ TSS STUDIO -- PLAYWRIGHT LIVE SITE DIAGNOSTIC SUITE ✦");
  console.log("================================================================================");
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  const consoleMessages = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', msg => {
    const log = `[${msg.type().toUpperCase()}] ${msg.text()}`;
    consoleMessages.push(log);
    console.log(`  Console: ${log}`);
  });

  page.on('pageerror', err => {
    pageErrors.push(err.stack || err.message);
    console.log(`  PageError: ${err.message}`);
  });

  page.on('requestfailed', request => {
    const failure = request.failure();
    const log = `${request.url()} (${failure ? failure.errorText : 'failed'})`;
    failedRequests.push(log);
    console.log(`  RequestFailed: ${log}`);
  });

  console.log("Navigating to https://winity.life...");
  try {
    const response = await page.goto('https://winity.life', { waitUntil: 'load', timeout: 30000 });
    console.log(`Navigation status: ${response.status()} ${response.statusText()}`);
    
    console.log("Waiting 5 seconds for WebGL/3D Canvas and dynamic triggers to render...");
    await page.waitForTimeout(5000);
    
    const screenshotPath = path.resolve('C:\\Users\\timot\\.gemini\\antigravity-ide\\brain\\a93afc75-f47c-4a2a-aade-75f336038918\\winity_live_screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`✓ Screenshot successfully saved to: ${screenshotPath}`);
    
    // Evaluate if there are specific elements like app store download links
    const buttonsCount = await page.locator('a[href*="apple.com"], a[href*="play.google.com"]').count();
    console.log(`✓ Found ${buttonsCount} App Store / Play Store download links on page.`);
    
  } catch (err) {
    console.error(`✗ Error during execution: ${err.message}`);
  } finally {
    await browser.close();
    console.log("\n--- DIAGNOSTIC SUMMARY ---");
    console.log(`Total Console Messages: ${consoleMessages.length}`);
    console.log(`Total Javascript Errors: ${pageErrors.length}`);
    console.log(`Total Failed Requests: ${failedRequests.length}`);
    console.log("================================================================================");
  }
})();
