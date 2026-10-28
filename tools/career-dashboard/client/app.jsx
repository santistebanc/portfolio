import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Desk, Icon, ConfirmDialog } from './desk';
import { HistoryView } from './profile';
import { ProfileView } from './profile-overview';
import { UpdatesView } from './updates';
import { DocumentsView, DocumentEditor } from './documents';
import { SettingsView } from './settings';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import './theme.css';

function route() {
  const value = location.hash.slice(1), document = /^document\/([a-zA-Z0-9_-]+)$/.exec(value);
  if (document) return { screen: 'Documents', document: document[1] };
  return { screen: ({ profile: 'Profile', updates: 'Updates', documents: 'Documents', settings: 'Settings', history: 'History' })[value] || 'Profile', document: null };
}
function App() {
  const [state, setState] = useState(null), current = useRef(null);
  const [screen, setScreen] = useState(() => route().screen), [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(() => route().document), [correction, setCorrection] = useState(null), [buffers, setBuffers] = useState({});
  const [confirmation, setConfirmation] = useState(null), [pendingAction, setPendingAction] = useState(null);
  const focusNext = useRef(false);
  useEffect(() => { const frame = requestAnimationFrame(() => { window.scrollTo(0, 0); if (focusNext.current) { document.querySelector('main h1')?.focus({ preventScroll: true }); focusNext.current = false; } }); return () => cancelAnimationFrame(frame); }, [screen, selectedDoc]);
  useEffect(() => { const navigate = () => { const next = route(); focusNext.current = true; setScreen(next.screen); setSelectedDoc(next.document); setConfirmation(null); }; window.addEventListener('popstate', navigate); window.addEventListener('hashchange', navigate); return () => { window.removeEventListener('popstate', navigate); window.removeEventListener('hashchange', navigate); }; }, []);
  useEffect(() => { const dirty = Object.entries(buffers).some(([id, body]) => id === '__capture' ? body.trim().length > 0 : body !== state?.drafts.find((d) => d.id === id)?.body); if (!dirty) return; const protect = (e) => { e.preventDefault(); e.returnValue = ''; }; window.addEventListener('beforeunload', protect); return () => window.removeEventListener('beforeunload', protect); }, [buffers, state]);
  async function refresh() {
    const response = await fetch('/api/state'), data = await response.json();
    if (!response.ok) throw new Error(data.error);
    const previous = current.current;
    if (!previous || data.revision >= previous.revision && data.profile.revision >= previous.profile.revision) { current.current = data; setState(data); }
    return current.current;
  }
  useEffect(() => { refresh().catch((e) => setError(e.message)); }, []);
  useEffect(() => { if (busy) return; const timer = setInterval(() => { if (!document.hidden) refresh().catch(() => {}); }, 30000); return () => clearInterval(timer); }, [busy]);
  async function act(action, input = {}, message = 'Saved') {
    setBusy(true); setPendingAction(action); setError(''); setNotice('');
    try {
      const snapshot = current.current;
      const response = await fetch('/api/' + action, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Career-Token': snapshot.token }, body: JSON.stringify({ ...input, revision: snapshot.revision }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      await refresh(); setNotice(message); return data.result;
    } catch (e) { setError(e.message); await refresh().catch(() => {}); return null; }
    finally { setBusy(false); setPendingAction(null); }
  }
  function go(next, documentId = null) { focusNext.current = true; setScreen(next); setSelectedDoc(next === 'Documents' ? documentId : null); setError(''); setNotice(''); const hash = next === 'Documents' && documentId ? 'document/' + documentId : next.toLowerCase(); if (location.hash !== '#' + hash) history.pushState(null, '', '#' + hash); }
  function openDoc(id) { go('Documents', id); }
  function confirm(config) { setError(''); setConfirmation({ ...config, returnFocus: document.activeElement }); }
  function editFact(claim) {
    setCorrection({ claimId: claim.id, subjectId: claim.subjectId, field: claim.field, statement: claim.statement,
      source: claim.source.reference, sourceKind: claim.source.kind === 'calculation' ? 'self-report' : claim.source.kind }); go('Updates');
  }
  const records = state?.profile.records || [], claims = records.filter((r) => r.type === 'claim');
  const eligible = claims.filter((r) => r.confirmation === 'confirmed' && r.answerState === 'provided' && !r.conflict);
  const pending = (state?.proposals.filter((p) => p.status === 'pending').length || 0) + (state?.notes.filter((n) => n.status === 'pending').length || 0);
  function context(claim) { const subject = records.find((r) => r.id === claim.subjectId); return subject?.type === 'story' ? records.find((r) => r.id === subject.contextId) : subject; }
  const value = { state, current, act, refresh, busy, pendingAction, error, setError, setNotice, confirm, go, openDoc, editFact, records, claims, eligible, context, correction, setCorrection, buffers, setBuffers, selectedDoc, setSelectedDoc };
  return <Desk.Provider value={value}><div className="app-shell">
    <a className="skip-link" href="#main-content" onClick={(e) => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
    <div className="app-bar"><a className="brand" href="#profile" onClick={(e) => { e.preventDefault(); go('Profile'); }}><span className="brand-mark">c.</span>Career desk</a>
      <nav className="main-nav" aria-label="Main navigation">{['Profile', 'Updates', 'Documents'].map((name) => <button key={name} aria-label={name} aria-current={screen === name || screen === 'History' && name === 'Profile' ? 'page' : undefined} onClick={() => go(name)}><Icon name={name === 'Profile' ? 'profile' : name === 'Updates' ? 'updates' : 'document'} />{name}{name === 'Updates' && pending > 0 && <span className="nav-count">{pending}</span>}</button>)}</nav>
      <div className="app-utilities"><span className="private-label"><Icon name={busy ? 'clock' : 'lock'} size={12} />{busy ? pendingAction === 'scan' ? 'Checking…' : 'Saving…' : 'Private'}</span><button className="quiet settings-button" aria-label="Settings" onClick={() => go('Settings')}><Icon name="settings" /></button></div>
    </div>
    <main id="main-content" tabIndex={-1}>
      {!state ? <div className="loading"><h1>Your career profile</h1><p>{error ? 'Could not connect to your local profile.' : 'Loading your profile…'}</p>{error && <button onClick={() => refresh().catch((e) => setError(e.message))}>Try again</button>}</div> : <>
        {screen === 'Profile' && <ProfileView pending={pending} />}
        {screen === 'Updates' && <UpdatesView />}
        {screen === 'Documents' && (selectedDoc ? <DocumentEditor key={selectedDoc} /> : <DocumentsView />)}
        {screen === 'Settings' && <SettingsView />}{screen === 'History' && <HistoryView />}
      </>}
      <footer><span>Only you decide what goes public.</span><span>Saved on this computer</span></footer>
    </main>
    {((error && !confirmation) || notice) && <div className={'feedback-toast ' + (error ? 'error' : '')} role={error ? 'alert' : 'status'}><Icon name={error ? 'updates' : 'check'} size={18} /><div><p>{error || notice}</p>{error && <button className="text-button" onClick={() => refresh().then(() => { setError(''); setNotice('Latest changes loaded. Check your input and try again.'); }).catch((e) => setError(e.message))}>Load latest changes</button>}</div><button className="quiet" aria-label="Dismiss notification" onClick={() => { setNotice(''); setError(''); }}><Icon name="close" size={16} /></button></div>}
    {confirmation && <ConfirmDialog config={confirmation} onClose={() => setConfirmation(null)} busy={busy} error={error} />}
  </div></Desk.Provider>;
}
createRoot(document.getElementById('root')).render(<App />);
