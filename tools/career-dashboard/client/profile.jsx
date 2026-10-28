import React, { useState } from 'react';
import { useDesk, PageTitle, Icon, date } from './desk';

export function HistoryView() {
  const { state, act, busy, go } = useDesk();
  const [limit, setLimit] = useState(10), [restore, setRestore] = useState(null);
  return <><button className="back-button" onClick={() => go('Profile')}><Icon name="back" size={16} />Back to profile</button><PageTitle title="Profile history">Earlier versions stay available if you need them.</PageTitle>{restore && <section className="review-card"><h2>Restore the profile from {date(restore.at)}?</h2><p>This restores your private profile and keeps the current version in history. Published documents stay as they are.</p><div className="actions"><button className="primary" disabled={busy} onClick={async () => { if (await act('restoreProfile', { profileRevision: state.profile.revision, targetRevision: restore.revision }, 'Earlier profile restored.')) setRestore(null); }}>Restore this profile</button><button onClick={() => setRestore(null)}>Cancel</button></div></section>}<section className="history-list">{[...state.profile.history].reverse().slice(0, limit).map((h) => <div className="history-row" key={h.revision}><span>{h.reason}<small>{date(h.at)}</small></span><button disabled={busy || h.revision === state.profile.revision} onClick={() => setRestore(h)}>{h.revision === state.profile.revision ? 'Current' : 'Restore'}</button></div>)}{state.profile.history.length > limit && <button onClick={() => setLimit(limit + 20)}>Show earlier versions</button>}</section></>;
}
