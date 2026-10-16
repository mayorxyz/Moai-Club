// scripts/test-nav.mjs — verify My NFTs appears under the Mint dropdown
import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

// Hover the Mint group to open its dropdown
const mintGroup = page.locator('.hdr-group', { hasText: 'Mint' }).first();
await mintGroup.hover();
await page.waitForTimeout(400);

const items = await mintGroup.locator('.hdr-panel a').allInnerTexts();
console.log('Mint dropdown items:', JSON.stringify(items));
const hasMyNfts = items.some(t => t.trim() === 'My NFTs');
console.log('My NFTs in Mint dropdown:', hasMyNfts);

if (hasMyNfts) {
  await mintGroup.locator('.hdr-panel a', { hasText: 'My NFTs' }).click();
  await page.waitForTimeout(600);
  console.log('URL after click:', page.url());
  const heading = await page.locator('.section-title').first().innerText().catch(() => 'n/a');
  console.log('Page heading:', heading);
}
await browser.close();
