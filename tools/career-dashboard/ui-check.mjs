// Optional browser acceptance check. Supply the design skill's CDP module path.
// Uses an isolated profile and output directory, never the person's real records.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { pathToFileURL } from 'node:url';
import { createHub } from './hub.mjs';
import { startServer } from './server.mjs';
import { initStore, updateStore } from '../../.agents/skills/career-profile-builder/scripts/store.mjs';
import { patchRecords, confirm } from '../../.agents/skills/career-profile-builder/scripts/model.mjs';

const modulePath = process.argv[2];
if (!modulePath) throw new Error('Pass the path to the design skill scripts/lib/cdp.mjs');
const { Browser } = await import(pathToFileURL(path.resolve(modulePath)).href);
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'career-desk-browser-'));
const home = path.join(root, 'private'), publicDir = path.join(root, 'public'); fs.mkdirSync(publicDir);
initStore(home);
updateStore(home, 0, 'Browser fixture', (doc, at) => {
  patchRecords(doc, [{ id: 'profile', name: 'Browser acceptance candidate' },
    { id: 'fixture_claim', type: 'claim', subjectId: 'profile', field: 'experience', statement: 'Built accessible React interfaces.', source: { kind: 'self-report', reference: 'Acceptance fixture' } }], at);
  confirm(doc, 'fixture_claim', at);
});
const hub = createHub({ home, publicDir }), server = startServer({ port: 0, hub, timer: false });
await once(server, 'listening');
const url = 'http://127.0.0.1:' + server.address().port;
let browser, page;
const checks = [];
try {
  browser = await Browser.launch(); page = await browser.newPage(); await page.goto(url);
  async function until(fn, message) {
    const deadline = Date.now() + 10000;
    while (Date.now() < deadline) { if (await page.eval(fn)) return; await new Promise((r) => setTimeout(r, 80)); }
    throw new Error(message);
  }
  async function click(label, scope = 'main') {
    assert.equal(await page.eval(({ label, scope }) => {
      const b = [...document.querySelectorAll(scope + ' button')].find((b) => b.textContent.trim() === label || b.getAttribute('aria-label') === label);
      if (!b || b.disabled) return false; b.focus(); b.click(); return true;
    }, { label, scope }), true, 'Usable button: ' + label);
  }
  async function fill(selector, value) {
    await page.eval(({ selector, value }) => {
      const el = document.querySelector(selector);
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, { selector, value });
  }
  await until(() => document.body.textContent.includes('Browser acceptance candidate'), 'Profile did not load');
  assert.equal(await page.eval(() => document.querySelectorAll('nav button').length), 3);
  assert.equal(await page.eval(() => getComputedStyle(document.documentElement).colorScheme), 'dark');
  assert.equal(await page.eval(() => !!document.querySelector('textarea[name=experience]')), false, 'Composer is hidden until requested');
  await click('Add experience');
  assert.equal(await page.eval(() => document.activeElement?.name), 'experience', 'Composer receives keyboard focus');
  await fill('textarea[name=experience]', 'I designed offline expense editing for Project Cedar.');
  await click('Close note'); await click('Continue note');
  assert.equal(await page.eval(() => document.querySelector('textarea[name=experience]').value), 'I designed offline expense editing for Project Cedar.');
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', modifiers: 2 });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', modifiers: 0 });
  await until(() => document.body.textContent.includes('Note added.'), 'Note did not persist');
  await page.eval(() => [...document.querySelectorAll('nav button')].find((b) => b.textContent.startsWith('Updates')).click());
  await until(() => !!document.querySelector('.review-card textarea'), 'Note review did not appear');
  await fill('.review-card textarea', 'Designed offline expense editing for Project Cedar.');
  await click('Save to profile');
  await until(() => document.body.textContent.includes('Saved to your private profile.'), 'Profile update was not saved');
  checks.push('three main destinations, dark theme and one-step reviewed profile update');
  await click('Documents', 'nav');
  await page.eval(() => [...document.querySelectorAll('.cv-card')].find((b) => b.querySelector('strong').textContent === 'Frontend developer').click());
  await until(() => !!document.querySelector('.document-preview'), 'Document preview did not appear');
  assert.equal(await page.eval(() => !!document.querySelector('.document-editor')), false);
  await click('Edit text');
  await fill('.document-editor', '# Browser acceptance candidate\n\nBuilt accessible React interfaces and designed offline editing.');
  await page.eval(() => document.querySelector('.action-panel input[type=checkbox]').click());
  await click('Approve version');
  await until(() => document.body.textContent.includes('Your version is approved'), 'Approval did not appear');
  assert.equal(hub.view().publications.length, 0, 'Approving does not publish');
  const pdfUrl = await page.eval(() => [...document.querySelectorAll('a')].find((a) => a.textContent === 'Download CV').href);
  assert.equal(Buffer.from(await (await fetch(pdfUrl)).arrayBuffer()).subarray(0, 5).toString(), '%PDF-');
  checks.push('readable preview → edit → save and approve → actual PDF download');
  await page.eval(() => { document.querySelector('.document-options').open = true; });
  await click('Add this CV to my website');
  await until(() => !!document.querySelector('.publish-confirmation'), 'Publication confirmation did not appear');
  await click('Save to website folder');
  await until(() => document.body.textContent.includes('Saved to your website folder.'), 'Publication receipt did not appear');
  assert.equal(fs.readFileSync(path.join(publicDir, 'career/cv-frontend.pdf')).subarray(0, 5).toString(), '%PDF-');
  checks.push('publication stays separate and requires an explicit destination confirmation');
  await click('Edit text');
  await fill('.document-editor', '# Browser acceptance candidate\n\nUnsaved wording retained across navigation.');
  await click('Profile', 'nav'); await click('Documents', 'nav');
  await page.eval(() => [...document.querySelectorAll('.cv-card')].find((b) => b.querySelector('strong').textContent === 'Frontend developer').click());
  await until(() => document.body.textContent.includes('Unsaved wording retained across navigation.'), 'Unsaved edits were lost on navigation');
  await click('Save changes');
  await until(() => document.body.textContent.includes('Changes saved.'), 'Changes were not saved');
  await page.eval(() => { document.querySelector('.document-options').open = true; const item = [...document.querySelectorAll('.document-options details')].find((d) => d.querySelector('summary').textContent === 'Version history'); item.open = true; document.querySelector('.version-row').click(); });
  await until(() => document.body.textContent.includes('An earlier version'), 'Version history did not open');
  const priorDocumentHash = await page.eval(() => location.hash);
  await click('Restore this version');
  await until(() => document.body.textContent.includes('Built accessible React interfaces and designed offline editing.'), 'Earlier content was not restored');
  checks.push('unsaved edits survive navigation and earlier approved content can be restored');
  await page.eval(() => { history.back(); });
  await until('location.hash === ' + JSON.stringify(priorDocumentHash), 'Browser Back did not return to the previous document');
  await until(() => document.body.textContent.includes('Unsaved wording retained across navigation.'), 'Previous document was not restored by browser Back');
  await page.eval(() => { history.back(); });
  await until(() => location.hash === '#documents', 'Browser Back did not return to Documents');
  assert.equal(await page.eval(() => !!document.querySelector('.cv-grid')), true);
  checks.push('document links and browser Back reflect the current view');
  await click('Profile', 'nav'); await click('Add experience');
  await fill('textarea[name=experience]', 'A note to test dismissal.'); await click('Save note');
  await until(() => document.body.textContent.includes('Note added.'), 'Second note did not save');
  await click('Updates', 'nav'); await click('Dismiss');
  await until(() => !!document.querySelector('dialog[open]'), 'Dismissal did not ask for confirmation');
  assert.equal(await page.eval(() => document.activeElement.textContent), 'Cancel');
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', modifiers: 8 });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', modifiers: 0 });
  assert.equal(await page.eval(() => document.activeElement.textContent), 'Dismiss note', 'Dialog focus stays inside the modal');
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  await until(() => !document.querySelector('dialog[open]'), 'Escape did not close the dialog');
  assert.equal(await page.eval(() => document.activeElement.textContent), 'Dismiss');
  assert.equal(hub.view().notes.filter((n) => n.status === 'pending').length, 1, 'Cancelling leaves the note intact');
  await click('Dismiss'); await click('Dismiss note', 'dialog');
  await until(() => document.body.textContent.includes("You're up to date"), 'Confirmed dismissal did not finish');
  checks.push('note text survives closing; keyboard save, dialog focus containment and Escape cancellation work');
  await click('Documents', 'nav');
  await page.eval(() => document.querySelector('.cv-card').click());
  await page.eval(() => { document.querySelector('.document-options').open = true; });
  const discardedHash = await page.eval(() => location.hash);
  await click('Discard this draft'); await until(() => !!document.querySelector('dialog[open]'), 'Discard did not ask for confirmation');
  await click('Discard draft', 'dialog'); await until(() => !!document.querySelector('.cv-grid'), 'Discard did not return to documents');
  await page.eval(() => history.back());
  await until('location.hash === ' + JSON.stringify(discardedHash), 'Back did not revisit the discarded draft');
  await until(() => document.body.textContent.includes('Draft discarded'), 'Archived document did not explain its state');
  await click('Restore draft'); await until(() => document.body.textContent.includes('Draft restored for review.'), 'Archived document could not be restored');
  checks.push('discarding requires confirmation and browser Back still offers a clear restoration path');
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewport({ width, height: 900, mobile: width <= 390 });
    for (const label of ['Profile', 'Updates', 'Documents', 'Settings', 'Profile history']) {
      if (label === 'Settings') await click('Settings', '.app-bar');
      else if (label === 'Profile history') { await click('Profile', 'nav'); await click('Profile history'); }
      else await click(label, 'nav');
      const overflow = await page.eval(() => [...document.querySelectorAll('main *')].filter((el) => el.getBoundingClientRect().right > innerWidth + 1).slice(0, 6).map((el) => ({ tag: el.tagName, class: el.className, text: el.textContent.slice(0, 90) })));
      assert.equal(await page.eval(() => document.documentElement.scrollWidth > innerWidth), false, 'No horizontal overflow on ' + label + ' at ' + width + ': ' + JSON.stringify(overflow));
      assert.ok(await page.eval(() => document.querySelector('h1')?.textContent), 'Screen has a heading');
    }
    checks.push('main screens, settings and history at ' + width + 'px, no overflow');
  }
  await page.setViewport({ width: 640, height: 450 });
  await click('Documents', 'nav');
  assert.equal(await page.eval(() => document.documentElement.scrollWidth > innerWidth), false, 'No overflow at a 200% zoom-equivalent viewport');
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert.equal(await page.eval(() => getComputedStyle(document.querySelector('.cv-card')).transitionDuration), '0s');
  await page.setViewport({ width: 320, height: 800, mobile: true }); await click('Profile', 'nav');
  await page.eval(() => { document.querySelector('.feedback-toast button[aria-label="Dismiss notification"]')?.click(); document.querySelector('.skip-link').focus(); });
  for (let i = 0; i < 22; i++) {
    await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab' });
    await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab' });
    const focus = await page.eval(() => { const el = document.activeElement; if (el === document.body) return { clear: true }; const r = el.getBoundingClientRect(); const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { clear: r.width > 0 && r.height > 0 && (el === hit || el.contains(hit)), element: el.tagName + ' ' + el.textContent.slice(0, 60) }; });
    assert.equal(focus.clear, true, 'Keyboard focus stays visible: ' + focus.element);
  }
  checks.push('200% zoom-equivalent reflow, reduced motion and keyboard focus clear of fixed navigation');
  assert.deepEqual(page.consoleErrors, []); checks.push('no browser runtime exceptions');
  console.log(JSON.stringify({ passed: checks }, null, 2));
} finally {
  await page?.close(); await browser?.close(); await new Promise((resolve) => server.close(resolve));
  assert.ok(path.resolve(root).startsWith(path.join(os.tmpdir(), 'career-desk-browser-')));
  fs.rmSync(root, { recursive: true, force: true });
}
