import React, { createContext, useContext, useEffect, useId, useRef } from 'react';
export const Desk = createContext(null);
export const useDesk = () => useContext(Desk);
export const titles = { 'cv-frontend': 'Frontend developer', 'cv-fullstack': 'Fullstack developer', 'cv-product': 'Product engineer', 'cv-ai': 'AI-assisted development', portfolio: 'Portfolio', github: 'GitHub', linkedin: 'LinkedIn' };
export const date = (v) => v ? new Date(v).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : 'Not yet';
export const meaningful = (r) => !/readback|professional-name/.test(r.field);
export async function digest(value) { return [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)))].map((b) => b.toString(16).padStart(2, '0')).join(''); }
export function Icon({ name, size = 20 }) {
  const paths = {
    profile: <><circle cx="12" cy="8" r="3" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></>,
    updates: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6 7a7 7 0 0 1 11.5-2L20 8M4 16l2.5 3A7 7 0 0 0 18 17" /></>,
    document: <><path d="M14 3H6v18h12V7zM14 3v5h5M9 12h6M9 16h6" /></>,
    arrow: <path d="m9 5 7 7-7 7" />, back: <path d="m14 5-7 7 7 7" />,
    check: <path d="m5 12 4 4L19 6" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    edit: <><path d="m15 5 4 4M4 20l5-1L21 7l-4-4L5 15z" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12a18 18 0 0 0 18 0M10 14h4" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.document}</svg>;
}
export const Badge = ({ children, tone = '' }) => <span className={'badge ' + tone}>{children}</span>;
export const Empty = ({ children }) => <p className="empty">{children}</p>;
export function Field({ label, children, hint }) { return <label className="field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>; }
export function PageTitle({ title, children, action }) { return <header className="page-title"><div><h1 tabIndex={-1}>{title}</h1>{children && <p>{children}</p>}</div>{action}</header>; }
export function ConfirmDialog({ config, onClose, busy, error }) {
  const ref = useRef(null), titleId = useId(), descriptionId = useId();
  useEffect(() => { const dialog = ref.current, previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; dialog.showModal(); return () => { dialog.close(); document.body.style.overflow = previousOverflow; if (config.returnFocus?.isConnected) config.returnFocus.focus(); }; }, []);
  return <dialog ref={ref} className="confirm-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={(e) => { e.preventDefault(); if (!busy) onClose(); }} onKeyDown={(e) => {
    if (e.key === 'Escape') { e.preventDefault(); if (!busy) onClose(); return; }
    if (e.key !== 'Tab' || e.ctrlKey || e.metaKey || e.altKey) return;
    const controls = [...ref.current.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), select:not(:disabled)')];
    if (!controls.length) { e.preventDefault(); return; }
    if (e.shiftKey && document.activeElement === controls[0]) { e.preventDefault(); controls.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === controls.at(-1)) { e.preventDefault(); controls[0].focus(); }
  }}>
    <div className="dialog-symbol"><Icon name={config.icon || 'document'} size={24} /></div>
    <h2 id={titleId}>{config.title}</h2><p id={descriptionId}>{config.description}</p>
    {error && <p className="dialog-error" role="alert">{error}</p>}
    <div className="actions"><button autoFocus disabled={busy} onClick={onClose}>Cancel</button><button className={config.danger ? 'danger-button' : 'primary'} disabled={busy} onClick={async () => { const result = await config.onConfirm(); if (result !== false && result !== null) onClose(); }}>{busy ? 'Working…' : config.label}</button></div>
  </dialog>;
}
export function DocumentPreview({ body }) {
  return <div className="document-preview">{body.split('\n').filter((s) => s.trim()).map((line, i) => {
    if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;
    if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
    if (line.startsWith('# ')) return <h2 className="document-title" key={i}>{line.slice(2)}</h2>;
    if (line.startsWith('- ')) return <p className="document-bullet" key={i}><span>•</span>{line.slice(2)}</p>;
    return <p key={i}>{line}</p>;
  })}</div>;
}
