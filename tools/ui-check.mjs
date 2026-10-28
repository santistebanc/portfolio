// Exercise only the built public site, on an ephemeral loopback server.
import assert from 'node:assert/strict';
import { preview } from 'vite';
import { chromium } from 'playwright';

const server = await preview({ preview: { host: '127.0.0.1', port: 0, strictPort: true, open: false } });
const url = 'http://127.0.0.1:' + server.httpServer.address().port;
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const exceptions = [];
  page.on('pageerror', (error) => exceptions.push(error.message));
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.locator('#hero-title').waitFor({ state: 'visible' });
  assert.equal(await page.locator('h1').count(), 1);
  assert.match(await page.locator('h1').innerText(), /Carlos\s+Santisteban/i);
  assert.match(await page.locator('#hero').innerText(), /Software\s+Engineer/i);
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['day', 'night']) {
      await page.evaluate((value) => { document.documentElement.dataset.theme = value; }, theme);
      for (const id of ['hero', 'work', 'ai-workflow', 'about', 'skills', 'contact']) {
        await page.locator('#' + id).scrollIntoViewIfNeeded();
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, 'Horizontal overflow: ' + id + ' at ' + width + 'px in ' + theme);
      }
    }
  }
  const paths = await page.locator('a[href^="/"], img[src^="/"]').evaluateAll((elements) => [...new Set(elements.map((element) => element.getAttribute('href') || element.getAttribute('src')))]);
  assert.ok(paths.includes('/Carlos_Santisteban_CV.pdf'));
  assert.ok(!paths.includes('/Carlos_Santisteban_CV_DE.pdf'));
  assert.equal(paths.filter((file) => file.endsWith('.pdf')).length, 1);
  for (const file of paths) {
    const response = await page.request.get(url + file);
    assert.equal(response.status(), 200, 'Missing public asset: ' + file);
    if (file.endsWith('.pdf')) assert.equal((await response.body()).subarray(0, 5).toString(), '%PDF-');
  }
  await page.getByRole('button', { name: 'Tweaks', exact: true }).click();
  await page.getByRole('radio', { name: 'Night', exact: true }).check();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'night');
  await page.getByRole('radio', { name: 'Off', exact: true }).check();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.motion), 'off');
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog', { name: 'Tweaks' }).count(), 0);
  assert.deepEqual(exceptions, []);
  console.log('Public UI passed: design 5; four widths; day/night themes; only the English CV; local assets; preferences; no runtime exceptions.');
} finally {
  await browser?.close();
  await server.close();
}
