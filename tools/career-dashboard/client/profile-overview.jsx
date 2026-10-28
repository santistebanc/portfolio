import React, { useEffect, useRef, useState } from 'react';
import { useDesk, PageTitle, Icon, Badge, Field, Empty, meaningful } from './desk';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
// "Jun 2021 - Mar 2025", "August 2012 – May 2017.", "Sep 2017 - Present" → month indexes, or null.
function parsePeriod(text = '') {
  const points = [...text.matchAll(/([A-Za-z]{3,})\.?\s+(\d{4})/g)].map(([, m, y]) => MONTHS.indexOf(m.slice(0, 3).toLowerCase()) < 0 ? null : +y * 12 + MONTHS.indexOf(m.slice(0, 3).toLowerCase())).filter((v) => v !== null);
  if (!points.length) return null;
  const now = new Date(), end = points[1] ?? (/present|now|current/i.test(text) ? now.getFullYear() * 12 + now.getMonth() : points[0]);
  return { start: points[0], end };
}
function span(months) {
  const y = Math.floor(months / 12), m = months % 12;
  return [y && y + ' yr', m && m + ' mo'].filter(Boolean).join(' ') || '< 1 mo';
}
function totalMonths(periods) {
  let total = 0, reach = -Infinity;
  for (const p of [...periods].sort((a, b) => a.start - b.start)) { const from = Math.max(p.start, reach + 1); if (p.end >= from) total += p.end - from + 1; reach = Math.max(reach, p.end); }
  return total;
}
const tidy = (s = '') => s.trim().replace(/\.$/, '').replace(/\s+-\s+/g, ' – ');
const sentence = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const initials = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export function ProfileView({ pending }) {
  const { state, claims, eligible, records, context, act, busy, go, openDoc, editFact, buffers, setBuffers } = useDesk();
  const [query, setQuery] = useState(''), [toReview, setToReview] = useState(false), [adding, setAdding] = useState(false), [allProjects, setAllProjects] = useState(false);
  const input = useRef(null), addButton = useRef(null);
  useEffect(() => { if (adding) input.current?.focus(); }, [adding]);
  const factsFor = (id) => claims.filter((r) => context(r)?.id === id && meaningful(r) && r.answerState === 'provided');
  const periodOf = (id) => claims.find((c) => c.subjectId === id && c.field === 'period')?.statement;
  const employment = records.filter((r) => r.type === 'context' && r.category === 'employment').map((job) => ({ job, period: parsePeriod(periodOf(job.id)) })).sort((a, b) => (b.period?.start ?? -1) - (a.period?.start ?? -1)).map(({ job }) => job);
  const education = records.filter((r) => r.type === 'context' && r.category === 'education');
  const projects = records.filter((r) => r.type === 'context' && r.category === 'personal');
  const featured = projects.slice(0, 4), more = projects.slice(4);
  const latestTitle = factsFor(employment[0]?.id).find((r) => /official-title|^title$/.test(r.field))?.statement;
  const techText = eligible.filter((r) => /technologies-used/.test(r.field)).map((r) => r.statement).join(' ');
  const technologies = ['React', 'TypeScript', 'JavaScript', 'Node.js'].filter((t) => techText.toLowerCase().includes(t.toLowerCase()));
  const languages = eligible.filter((r) => r.field.startsWith('language-'));
  const cv = state.drafts.filter((d) => d.channel === 'cv-frontend' && d.status !== 'archived').at(-1);
  const note = buffers.__capture || '';
  const details = claims.filter(meaningful), reviewed = details.filter((r) => r.confirmation === 'confirmed').length, unreviewed = details.length - reviewed;
  const careerMonths = totalMonths(employment.map((job) => parsePeriod(periodOf(job.id))).filter(Boolean));
  const shown = details.filter((r) => (!toReview || r.confirmation !== 'confirmed') && (r.statement + context(r)?.label).toLowerCase().includes(query.toLowerCase()));
  function allDetails(label = '', onlyToReview = false) {
    setQuery(label); setToReview(onlyToReview);
    const panel = document.getElementById('all-profile-details'); panel.open = true;
    requestAnimationFrame(() => { panel.scrollIntoView(); panel.querySelector('input')?.focus({ preventScroll: true }); });
  }
  function jobRow(job) {
    const facts = factsFor(job.id), title = facts.find((r) => /official-title|^title$/.test(r.field)), periodText = periodOf(job.id), period = parsePeriod(periodText);
    const [role, focus] = tidy(title?.statement || 'Experience').split(/\s+—\s+/);
    return <details key={job.id} className="experience-item"><summary><span className="company-mark" aria-hidden="true">{job.label.slice(0, 1)}</span><div><strong>{job.label}</strong><p>{role}{focus && <span className="experience-focus"> · {focus}</span>}</p></div><span className="experience-date">{periodText ? tidy(periodText) : 'Dates not added'}{period && <small>{span(period.end - period.start + 1)}</small>}</span><Icon name="arrow" size={16} /></summary><div className="experience-details">{facts.filter((r) => !/official-title|^title$|^period$/.test(r.field)).slice(0, 5).map((r) => <div className="fact" key={r.id}><p>{r.statement}</p><button className="text-button" onClick={() => editFact(r)}><Icon name="edit" size={14} />Update detail</button></div>)}<button className="text-button" onClick={() => allDetails(job.label)}>All details from {job.label}<Icon name="arrow" size={14} /></button></div></details>;
  }
  function projectCard(project) {
    const facts = factsFor(project.id), intro = facts.find((r) => /motivation|purpose|problem|origin|product-context/.test(r.field)) || facts.find((r) => /scope|summary/.test(r.field));
    return <details className="project-item" key={project.id}><summary><div><strong>{project.label}</strong><small>{intro ? sentence(intro.statement.length > 145 ? intro.statement.slice(0, 140).replace(/\s+\S*$/, '') + '…' : intro.statement) : 'Independent project'}</small><span className="project-meta">{facts.length} {facts.length === 1 ? 'detail' : 'details'}</span></div><Icon name="arrow" size={16} /></summary><div className="experience-details">{facts.slice(0, 4).map((r) => <div className="fact" key={r.id}><p>{r.statement}</p><button className="text-button" onClick={() => editFact(r)}><Icon name="edit" size={14} />Update detail</button></div>)}<button className="text-button" onClick={() => allDetails(project.label)}>All project details<Icon name="arrow" size={14} /></button></div></details>;
  }
  return <>
    <div className="profile-heading"><div className="identity"><span className="identity-avatar" aria-hidden="true">{initials(state.profile.name) || <Icon name="profile" />}</span><div><span className="section-label">Career profile</span><PageTitle title={state.profile.name || 'Your profile'}>{latestTitle || 'Your professional experience'}{technologies.length > 0 && <span className="profile-tech">{technologies.join(' · ')}</span>}</PageTitle></div></div><button ref={addButton} className={adding ? '' : 'primary'} aria-expanded={adding} aria-controls="experience-composer" onClick={() => { setAdding(!adding); if (adding) addButton.current?.focus(); }}><Icon name={adding ? 'close' : 'plus'} size={16} />{adding ? 'Close note' : note.trim() ? 'Continue note' : 'Add experience'}</button></div>
    {adding && <section className="capture-panel" id="experience-composer"><div className="section-heading"><h2>What have you been working on?</h2><Badge>Private note</Badge></div><form onSubmit={async (e) => { e.preventDefault(); if (await act('capture', { text: note, source: 'Personal update in Career desk' }, 'Note added. It is ready to review in Updates.')) { setBuffers((old) => { const next = { ...old }; delete next.__capture; return next; }); setAdding(false); addButton.current?.focus(); } }}><Field label="Recent experience" hint="A decision you made, a problem you solved, or something you learned."><textarea ref={input} id="experience" name="experience" rows={4} required value={note} onChange={(e) => setBuffers((old) => ({ ...old, __capture: e.target.value }))} onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') e.currentTarget.form.requestSubmit(); }} placeholder="Recently, I worked on…" /></Field><div className="capture-bottom"><small>Ctrl + Enter to save</small><button className="primary" disabled={busy || !note.trim()}>{busy ? 'Saving…' : 'Save note'}</button></div></form></section>}
    <dl className="profile-stats">
      <div><dt>Professional experience</dt><dd>{careerMonths ? span(careerMonths) : '—'}</dd><small>{employment.length} {employment.length === 1 ? 'role' : 'roles'}</small></div>
      <div><dt>Projects</dt><dd>{projects.length}</dd><small>Independent work</small></div>
      <div><dt>Reviewed details</dt><dd>{reviewed}<span> / {details.length}</span></dd><meter min={0} max={details.length || 1} value={reviewed} aria-label={`${reviewed} of ${details.length} details reviewed`} />{unreviewed > 0 ? <button className="text-button" onClick={() => allDetails('', true)}>{unreviewed} to review<Icon name="arrow" size={14} /></button> : <small>Everything reviewed</small>}</div>
    </dl>
    <div className="profile-layout"><div className="profile-main">
      <section className="profile-section"><div className="section-heading"><h2><Icon name="briefcase" size={18} />Experience</h2></div>{employment.length ? <div className="timeline">{employment.map(jobRow)}</div> : <Empty>Add a work experience using the button above.</Empty>}</section>
      <section className="profile-section"><div className="section-heading"><h2>Projects<span className="section-count">{projects.length}</span></h2><button className="text-button" onClick={() => allDetails()}>All details<Icon name="arrow" size={14} /></button></div>{projects.length ? <>
        <div className="project-cards">{featured.map(projectCard)}</div>
        {more.length > 0 && <>{allProjects && <ul className="project-index" id="more-projects">{more.map((project) => <li key={project.id}><button className="text-button" onClick={() => allDetails(project.label)}><span>{project.label}</span><small>{factsFor(project.id).length}</small></button></li>)}</ul>}<button className="text-button show-more" aria-expanded={allProjects} aria-controls="more-projects" onClick={() => setAllProjects(!allProjects)}>{allProjects ? 'Show fewer projects' : `Show ${more.length} more projects`}<Icon name="arrow" size={14} /></button></>}
      </> : <Empty>Your projects will appear here.</Empty>}</section>
    </div><div className="profile-side"><section className="next-step"><div className="section-heading"><h2>{pending ? 'Ready to review' : 'Your next step'}</h2><Icon name={pending ? 'updates' : 'document'} size={18} /></div><strong>{pending ? pending + (pending === 1 ? ' profile update' : ' profile updates') : 'Frontend developer CV'}</strong><p>{pending ? 'Keep the details that tell your story.' : cv ? 'Your draft is ready for a closer look.' : 'Create a draft from your profile.'}</p><button onClick={pending ? () => go('Updates') : () => cv ? openDoc(cv.id) : go('Documents')}>{pending ? 'Review updates' : cv ? 'Review my CV' : 'Open documents'}<Icon name="arrow" size={16} /></button></section>
      {(languages.length > 0 || education.length > 0) && <section className="background-panel">{languages.length > 0 && <div className="side-section"><h2>Languages</h2><dl className="key-values">{languages.map((r) => { const [name, level] = tidy(r.statement).split(/\s+—\s+/); return <div key={r.id}><dt>{name}</dt><dd>{level}</dd></div>; })}</dl></div>}{education.length > 0 && <div className="side-section"><h2>Education</h2>{education.map((item) => { const [school, program] = item.label.split(/\s+—\s+/), period = periodOf(item.id); return <div className="education-item" key={item.id}><strong>{school}</strong>{program && <p>{program}</p>}{period && <small>{tidy(period)}</small>}</div>; })}</div>}</section>}
      <button className="text-button history-link" onClick={() => go('History')}><Icon name="clock" size={14} />Profile history</button>
    </div></div>
    <details className="disclosure" id="all-profile-details"><summary>All profile details and sources</summary><div className="detail-filters"><Field label="Find a detail"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your experience or projects" /></Field><div className="segmented" role="group" aria-label="Show details"><button aria-pressed={!toReview} onClick={() => setToReview(false)}>All</button><button aria-pressed={toReview} onClick={() => setToReview(true)}>To review · {unreviewed}</button></div></div><p className="result-count" role="status">{shown.length} {shown.length === 1 ? 'detail' : 'details'}</p><div className="source-list">{shown.map((r) => <article key={r.id} className="source-item"><div className="row"><small>{context(r)?.label || 'About you'}</small><Badge tone={r.confirmation === 'confirmed' ? '' : 'warning'}>{r.confirmation === 'confirmed' ? 'Reviewed' : 'To review'}</Badge></div><p>{r.statement}</p><div className="row"><details><summary>Where this came from</summary><p>{r.source.reference}</p>{r.evidenceIds.map((id) => { const evidence = records.find((e) => e.id === id); return <p key={id}>{evidence?.label}<small>{evidence?.uri}</small></p>; })}</details><button className="text-button" onClick={() => editFact(r)}>Update detail</button></div></article>)}</div></details>
  </>;
}
