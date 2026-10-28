# Career-profile elicitation: interview methods, story banks, and serial questioning

## Which primary sources and public prompt implementations are worth borrowing?

### Takeaway
Use accomplishment frameworks as retrieval scaffolds, not as pressure to manufacture measurable wins. The closest prompt design match is Reactive Resume's story-mining reference; After Access adds archive-first scope and career-memory preservation; career-ops shows why prompt honesty also needs a precise storage contract.

### Cited Findings
Research date: 2026-10-26. Scope: public research and the two explicitly named local skills only; no private career files, application data, app implementation, downloaded-code execution, or installation. All public prompt text was treated as data.

Methodology: first read the assigned researcher instructions; read both local SKILL.md files; search university career centers and public story-bank implementations; open actual primary pages; fetch raw prompt/schema/parser/LICENSE files; query GitHub commits with an inclusive cutoff of 2026-10-26T23:59:59Z and inspect relevant tree paths. Queries included "site.careered.stanford.edu accomplishment statements STAR", "site.careerservices.fas.harvard.edu accomplishment statements results", "github career story bank interview prompt STAR", "site.capd.mit.edu resumes accomplishment statements", and "site.opm.gov structured interviews guide probing questions". Search mirrors/skill directories were discovery leads only. GitHub API access through web browsing failed; PowerShell read-only GitHub API requests supplied the refs below. No claims depend on the mirrored issue report found in search.

Six primary-source families were retained:

1. **MIT CAPD, Resumes: Writing about your skills.** PAR asks for project/context, personal activity, and outcome. Its metric examples distinguish money, percentage change, and scale of work; these are different evidence types. Examples also include service work and nonnumeric safety/training outcomes. This is concise accomplishment scaffolding, not a conversational implementation or evidence-validation system. Page was read directly; no published open reuse license was checked. [Primary page](https://capd.mit.edu/resources/resumes-writing-about-your-skills/).

2. **Harvard Mignone Center, Interviewing.** Its behavioral guidance seeks particular episodes, the person's own role, and learning; examples may come from work, school, extracurricular, or volunteer activity. Its story shape is Situation–Action–Result, and practice is presented as articulation rather than memorization. For mistakes it asks for honesty, accountability, behaviors, and improvement. Useful for broadening eligible experience and keeping reflection; it does not define a profile database, memory protocol, or metric uncertainty model. No open reuse license checked. [Primary page, behavioral and negatively framed question sections](https://careerservices.fas.harvard.edu/resources/interviewing/).

3. **US Office of Personnel Management, Structured Interviews: A Practical Guide (September 2008).** Printed pp. 6–7 distinguish past-behavior evidence from hypothetical situations and advise clear, open questions tied to competencies. Printed pp. 12–13 define clarification probes and advise establishing their permitted range beforehand; the probe table spans context, first action, reasoning, outcome, and doing things differently. Printed p. 14 recommends trialing questions. This is guidance for employer selection, not evidence that an AI autobiographical tool improves hiring outcomes. [Actual guide](https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/guide/); [official question-writing FAQ](https://www.opm.gov/frequently-asked-questions/assessment-policy-faq/structured-interviews/how-do-i-create-structured-interview-questions/). No separate reuse license established in this research.

4. **Reactive Resume interview-prep skill.** Checked commit **5d247c59de925b04e6e658300524812c7f544ec4**, commit time **2026-10-25T17:06:21Z**.
   - Actual main prompt routes bank-only work separately from company prep; uses Situation/Task/Action/Result/Reflection; forbids changing facts between renderings; requires checks for ownership, result quality, follow-up depth, and user correction. Its detailed mining reference defaults to one question, permits skipping, supports qualitative proxies and acknowledged ranges, requires approval of derived arithmetic, and includes career changers and optional caregiving. Coverage counts and recency rules are explicitly practitioner heuristics. [SKILL.md](https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/plugins/reactive-resume/skills/interview-prep/SKILL.md); [actual story-bank.md reference](https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/plugins/reactive-resume/skills/interview-prep/references/story-bank.md).
   - Specific techniques to borrow: incident openings by story type; probe chronological decisions rather than generic strengths; ask who reused the work or what stopped happening when numbers are unavailable; translate vocabulary while preserving the original setting; reflect the episode back for correction. These are inspected prompt mechanisms, not demonstrated effectiveness results. [Story mining, probe ladder, checks, career changers and thin-material sections](https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/plugins/reactive-resume/skills/interview-prep/references/story-bank.md).
   - Actual schema at lines 12–25 defines source kind/id/quote; facts carry that source. Story input at lines 64–74 has title, S/T/A/R/reflection, factIds, tags; result/reflection may be empty and factIds defaults empty. **The inspected story input schema does not require every claim to link to evidence or a confirmation state.** This is a scoped schema observation, not a claim that the whole product lacks provenance safeguards. [packages/schema/src/career.ts](https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/packages/schema/src/career.ts).
   - Repository license inspected: MIT, copyright 2026 Amruth Pillai; preserve applicable notices when reusing substantial material. [LICENSE](https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/LICENSE).

5. **After Access.** Checked commit **da04b4a0478a53e9cee2fed1ceffa8be8a792eff**, commit time **2026-07-07T15:45:17Z**.
   - Actual modular prompt separates discovery, archive, and career outputs, runs only selected modules, distinguishes ownership from influence, and marks unknowns. Limited-access prompt processes batches before a user-controlled synthesis gate. Fast recovery separates led/influenced/contributed. Story builder generates multiple lengths, skills, question matches, overclaiming cautions, and external-safe wording, but begins by requesting 5–10 accomplishments rather than eliciting one episode. [02-modular-archive-builder.md](https://github.com/mass-efa/after-access/blob/da04b4a0478a53e9cee2fed1ceffa8be8a792eff/prompts/02-modular-archive-builder.md); [03-limited-access-mode.md](https://github.com/mass-efa/after-access/blob/da04b4a0478a53e9cee2fed1ceffa8be8a792eff/prompts/03-limited-access-mode.md); [04-fast-recovery-mode.md](https://github.com/mass-efa/after-access/blob/da04b4a0478a53e9cee2fed1ceffa8be8a792eff/prompts/04-fast-recovery-mode.md); [05-interview-story-builder.md](https://github.com/mass-efa/after-access/blob/da04b4a0478a53e9cee2fed1ceffa8be8a792eff/prompts/05-interview-story-builder.md).
   - Its safety rule rejects sensitive/restricted source material and asks for a safer high-level recollection. However, limited-access mode simultaneously suggests reviews, emails, roadmaps, and project documents as possible batches; the prompt leaves the user/model to determine eligibility. Borrow its staged archive and safe recollection, not a blanket invitation to upload employer records. [Actual limited-access prompt](https://github.com/mass-efa/after-access/blob/da04b4a0478a53e9cee2fed1ceffa8be8a792eff/prompts/03-limited-access-mode.md).
   - MIT license expressly applies to material/documentation, copyright 2026 Michael Assefa. README also asks modified publishers to retain confidentiality/IP caution; this is a README request, distinguished from the actual MIT text. [LICENSE](https://github.com/mass-efa/after-access/blob/da04b4a0478a53e9cee2fed1ceffa8be8a792eff/LICENSE); [README](https://github.com/mass-efa/after-access/blob/da04b4a0478a53e9cee2fed1ceffa8be8a792eff/README.md).

6. **career-ops.** Checked commit **1f2ad61f7262d33a702df5d478ba09bee0d1e0c2**, commit time **2026-10-26T02:52:45Z**.
   - Actual interview-prep mode Step 5 separates story relevance from number confirmation, maps unconfirmable stories on narrative only, and warns against repeating an uncertain figure into prep output. The inspected template uses exact English labels and distinct user-stated/cannot-confirm provenance markers. [modes/interview-prep.md](https://github.com/career-ops-hq/career-ops/blob/1f2ad61f7262d33a702df5d478ba09bee0d1e0c2/modes/interview-prep.md); [templates/story-bank.template.md](https://github.com/career-ops-hq/career-ops/blob/1f2ad61f7262d33a702df5d478ba09bee0d1e0c2/templates/story-bank.template.md).
   - Parser source centralizes labels and story splitting, blanks comments/fences, and identifies table rows separately. Its documented contract drops stories without an Action field; headings/tables terminate story blocks. This is a concrete risk for a hand-edited or translated Markdown source of truth. Parser comments report historical reader inconsistencies; those comments were read as developer explanations, not independently reproduced failures. [Actual lib/story-bank.mjs, inspected initial 210 lines](https://github.com/career-ops-hq/career-ops/blob/1f2ad61f7262d33a702df5d478ba09bee0d1e0c2/lib/story-bank.mjs).
   - Repository MIT license inspected, copyright 2026 Santiago Fernández de Valderrama. [LICENSE](https://github.com/career-ops-hq/career-ops/blob/1f2ad61f7262d33a702df5d478ba09bee0d1e0c2/LICENSE). Product documentation was a navigation cross-check, not a substitute for prompt/code reads. [Story preparation guide](https://career-ops.org/docs/introduction/guides/prepare-star-stories).

### Inferences
**Recommendations, not source claims:**
- Most useful composition: MIT's compact action/context/outcome scaffold + OPM's planned clarification + Reactive Resume's story-specific probe ladder + After Access's archive-first scope + Questioning's resumption and revision mechanics.
- Store the rich episode before rendering a polished STAR answer. A single source of truth should retain ordinary responsibilities, recurring maintenance, context, preferences, uncertainty, and partial episodes, not only dramatic interview wins.
- Do not copy any source's fixed story-count/recency thresholds as product truth. A returner, career changer, specialist, or person doing continuing maintenance can have a valuable profile with different coverage.
- Target role is optional during discovery. Record preferences and candidate role hypotheses separately; a job description may guide what to explore next, but may never supply autobiographical facts.
- If building a skill first, its immediate value is interview policy plus a stable saved-session contract. CLI/UI integrations can follow after testing that the questions elicit useful, accurate material.

### Gaps
- No included source establishes improved hiring, ATS ranking, response rates, or career outcomes for this proposed builder. Do not imply these effects.
- Public main branches can move. Use the pinned commit URLs above; university pages were observed on the research date and were not archived to immutable snapshots.
- No implementation was run, no parser bug was reproduced, and no complete security/license audit was performed. Only named files/sections were inspected.
- The prescribed bounded research found complementary prompt mechanisms, not a validated optimal interview length or universal story count.

## What do the local grilling and questioning skills contribute, and what should change?

### Takeaway
Borrow dependency tracking, stable identity, explicit revisions, and completion confirmation. Replace relentless full-frontier rounds and recommended factual answers with one neutral autobiographical question at a time, bounded follow-ups, and graceful unknowns.

### Cited Findings
- **Local grilling skill, read in full:** models an interview as a dependency tree; asks the entire available frontier each round; gives recommended answers phrased for yes acceptance; looks up environmental facts; finishes when all branches are settled and requires shared-understanding confirmation before acting. It also tells its active operator to delegate factual research. Here it was read only as design material; that instruction was not invoked. [C:\Users\santi\.codex\skills\grilling\SKILL.md](C:/Users/santi/.codex/skills/grilling/SKILL.md).
  - SHA256: **26D225EA8A36F4ACACBE267E789CFB97D73964412F4243DD4B65B6CB806DDEBC**.
- **Local questioning skill, read in full:** app owns saved questions/answers/events; start can reattach to an unfinished workspace session; resume preserves the exact session; stable IDs retain answers; publish uses revision checking and can atomically acknowledge events; changed answers trigger dependent reconsideration; ready offers finish/continue only with no open nodes; finished sessions are read-only. It requires recommendations for open questions as well as choices. [C:\Users\santi\.agents\skills\questioning\SKILL.md](C:/Users/santi/.agents/skills/questioning/SKILL.md).
  - SHA256: **D7ABD8B221D29C2482B774003E8152C47DD5056E02B55D38BC91C0E67F9D5A1D**.
- Launcher inspected, not executed: scripts/q.mjs imports C:\Users\santi\.questioning\app\launch.mjs; the installed skill is a launcher for a shared app, not a self-contained career data model. No session directory or private transcript was read. [scripts/q.mjs](C:/Users/santi/.agents/skills/questioning/scripts/q.mjs).
- Questioning's staged-documentation approval rules concern its own active workflow; they are not being imported as an approval gate for this research. Its app is not an independent AI interviewer according to the skill. [Local SKILL.md](C:/Users/santi/.agents/skills/questioning/SKILL.md).

### Inferences
**Proposed adaptations:**
1. **Internal frontier, serial presentation.** Maintain the dependency graph internally; present only the highest-value currently answerable question. Context → responsibility → actions → outcome → evidence → reflection → confirmation. Never ask an outcome question that assumes success.
2. **Separate factual and preference questions.** Offer process recommendations (short session, next episode, optional evidence lookup). Never suggest a user's achievement, number, title, preference, or memory as the recommended yes-answer.
3. **Acknowledge autobiographical limits.** Unlike repository facts, private experiences usually cannot be discovered by the agent. Ask the user neutrally; offer authorized evidence retrieval later. Never search for their personal history without explicit scope.
4. **Permit unresolved terminal states.** A fact may be unknown, disputed, withheld, not applicable, or intentionally deferred. These states settle the current interview obligation without pretending the fact is known.
5. **Revision impact is explicit.** If a team size changes, review dependent scope wording; if dates change, review duration; if a metric changes, invalidate derived claims and existing output drafts. Do not discard unrelated confirmed facts.
6. **Fact confirmation differs from publication approval.** Autosave a clearly marked draft answer for resumption; ask the user to verify the episode summary before upgrading its factual status. Later CV/LinkedIn exports need their own review, outside this research scope.
7. **Respectful rigor:** challenge the claim's support, attribution, and causal wording; never challenge the person's worth or demand a triumphant framing.

### Gaps
- These local skills' effective runtime behavior was not tested. Facts here describe inspected instructions and one launcher, not a live interaction.
- No reuse license was established for the local skill text; write original instructions from the design ideas unless permission is otherwise known.
- The skills do not themselves define a career-specific claim/evidence/metric model, and their unconditional answer recommendations need adaptation before factual elicitation.

## What concrete serial interview, state, and stop rules should the builder use?

### Takeaway
A proposed session should produce one reviewable, resumable episode with attributable actions and explicitly qualified results. The interviewer may stop with missing metrics; it must not stop with hidden assumptions disguised as facts.

### Cited Findings
The design proposals below are original recommendations informed by the sources already cited; they are not copied source prompts, validated measures, or implementation commitments. Relevant source mechanisms are planned probes [OPM guide, printed pp. 12–14](https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/guide/), broad episode eligibility [Harvard](https://careerservices.fas.harvard.edu/resources/interviewing/), arithmetic confirmation and qualitative evidence [Reactive Resume reference](https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/plugins/reactive-resume/skills/interview-prep/references/story-bank.md), selected modules [After Access](https://github.com/mass-efa/after-access/blob/da04b4a0478a53e9cee2fed1ceffa8be8a792eff/prompts/02-modular-archive-builder.md), and durable revisions [local Questioning](C:/Users/santi/.agents/skills/questioning/SKILL.md).

### Inferences

#### Proposed interview policy
- One main question per turn. Briefly reflect the last answer; choose the next probe from the unresolved fields. Do not print the whole script at once.
- Begin with scope and permission to skip: choose a 10-, 20-, or 30-minute session, an episode or role, and any topic the user prefers to omit. These durations are adjustable product defaults, not evidence-based thresholds.
- Raw recollection comes before competency labels. Ask what happened in plain language, preserve the user's words, then suggest skill labels as interpretations to confirm.
- Do not make external evidence a prerequisite for telling a true experience. Distinguish user recollection, user-confirmed estimate, source-backed observation, derivation, model interpretation, and unknown.
- A counterfactual such as what might have happened without the work is a hypothesis, never a measured result. Ask about observable behavior first.
- Non-numeric outcomes can stand alone: a release accepted, work reused, a customer issue resolved, a recurring error stopped, a decision informed. Preserve failure/no change/unknown outcomes too.
- Source material may help memory, but request a safe high-level summary or permitted pointer rather than confidential uploads. Loss of access is a legitimate evidence state.
- Treat competencies as coverage hints, not diagnoses of the user's ability. No story remembered today does not mean no skill exists.

#### Proposed sequence A: a team project, with missing metrics
Each numbered step is a separate turn, conditional on prior answers.

1. "Pick one piece of work you remember clearly. What was happening, and roughly when?" Accept approximate dates.
2. "What needed to change for the people using or doing this work?" Distinguish intended goal from eventual result.
3. "Which part were you personally responsible for?" Record formal responsibility separately from initiative and influence.
4. "What did you do first?" Follow the actual chronology.
5. "Which decision required the most judgment?" Then ask for alternatives and constraints only if unclear.
6. If the user says the team built everything: "Which parts did you create, decide, coordinate, or review yourself?" Record collaborators' contributions too.
7. "What happened after the work was used?" If unfinished, ask current status rather than force a final outcome.
8. If a percentage is given: "Where does that figure come from?" Then clarify baseline, endpoint, unit, period, population, and whether measured or estimated, one missing detail at a time.
9. If no metric is known: "What concrete change did you notice?" If that also is unavailable, mark the outcome unknown; do not keep seeking a number.
10. "What else could have affected that change?" Use causal contribution language when the user cannot isolate an effect.
11. "What did you learn that changed how you work?" Reflection may be uncertain or still developing.
12. Present a short draft summary separating personal actions, team outcome, evidence/uncertainty, and omitted details. "Which part needs correction before this becomes a confirmed episode?"

Illustrative arithmetic, not user data: if comparable counts went from 40 to 30, reduction is (40−30)/40 = 25%. Confirm matching units, population, measurement window, and attribution before using the percentage. Do not annualize a one-off time saving or attach an invented hourly rate.

#### Proposed sequence B: memory stalls or "I only did my job"
1. "Choose one ordinary week in a role you remember. What repeatedly needed your attention?"
2. "Can you recall one occasion when that work was unusually difficult, changed, or received feedback?"
3. If still blank, offer one neutral memory route: a project timeline, a release/event, a handoff, repeated requests for help, learning a tool, or maintaining something others depended on. Do not present a fabricated example for acceptance.
4. "What did you actually do on that occasion?" Capture routine reliability, prevention, care, mentoring, and maintenance without demanding novelty.
5. "Who used the result, and what did you observe?" Do not infer revenue or avoided incidents.
6. After two unsuccessful retrieval attempts, save a minimal role/responsibility entry and offer another episode or end. The two-attempt cap is a proposed fatigue control, not a research finding.
7. Optional later memory task: note one evidence category and where the user could lawfully check it; access unavailable is an acceptable conclusion.

#### Proposed sequence C: career changer or nontraditional work
1. "What kind of work would you like more of, and what would you prefer to leave behind?" Target title may remain unknown.
2. "Which activities have you done that resemble that work, in any setting you want to include?" Offer paid work, coursework, self-directed projects, volunteering, open source, community work, or caregiving without requiring private explanations.
3. Select one episode and run Sequence A; preserve its real setting, dates, and capacity.
4. "What did you do that demonstrates the transferable skill?" Do not substitute a target-role job description for demonstrated actions.
5. "Which parts of the target work have you not done yet?" Store an explicit gap and any actual preparation separately from professional experience.
6. If supplied later, use two or three target postings to identify terminology and missing evidence; retain the role hypothesis as a versioned view.
7. Confirm a translation such as classroom assessment design to learning evaluation without relabeling school work as corporate experience. Do not inflate a self-study project into paid delivery.

#### Proposed sequence D: contradiction or uncertain ownership
1. "Earlier this was described as a team result; the draft now says you led it. Are these different phases, shared leadership, or a wording error?"
2. Show both claims with their sources/times. Ask what the user can support; do not pick the more impressive version.
3. If resolved, preserve the correction history and recheck dependent wording/metrics.
4. If unresolved, mark the affected claim disputed; keep undisputed context. It is ineligible for externally asserted wording until clarified.
5. Offer narrower phrasing only as an editable draft based on settled facts. User confirmation can establish their account; it does not turn recollection into documentary proof.

#### Proposed session record, independent of a future CLI/UI
This is a conceptual contract, not a finished schema:
- Session: stable ID, objective, selected module/episode, question IDs, dependency state, latest revision, last confirmed point, unanswered next question, budget, deferred items.
- Episode: stable ID, setting/type, date precision, intended goal, situation, personal responsibility, own action sequence and decision rationale, collaborators, constraints, observed outcome, reflection.
- Claim: exact statement, subject/owner, claim type, source pointer or recollection, evidence status, user confirmation date, uncertainty, conflict links, sharing restriction.
- Metric: value or range, unit, baseline/endline, relevant period/population, measured versus estimated, source, derivation/assumptions, confirmation. Missing is null/unknown, never zero.
- Views: competency tags, target-role mappings, and later CV/portfolio/LinkedIn/GitHub renderings reference episode/claim IDs. They do not independently amend the canonical history.
- Draft/confirmed/withheld/disputed/deferred are separate states. A confirmed story can contain an explicitly unknown outcome; completion and evidence strength are independent.
- A single rich source of truth can be one logical model with linked records; it need not be a single giant Markdown file.

#### Proposed stop and resume rules
- **Immediate stop:** user says pause/stop/skip, topic is withheld, or sensitive material requires redaction. Save the permitted current draft and a short next-step pointer; do not demand an explanation.
- **Probe stop:** stop after two unsuccessful attempts on the same missing fact, or when a further question merely restates an answered question. Record unknown or deferred.
- **Episode complete for this round:** setting/time precision, personal contribution, at least one concrete action, outcome status, uncertainty/evidence status, and the user's correction opportunity are recorded. Numeric metrics are optional.
- **Session budget:** warn near the chosen limit, finish the current thought, summarize confirmed/partial/conflicted items, then offer end or explicit extension. Never continue a relentless tree by default.
- **Coverage stop:** selected module is sufficiently covered for the user's present purpose, or the next gap has little likely value. Do not insist that all possible career branches be exhausted.
- **Resume:** restore the current revision, show a short recap of confirmed facts and the exact open question, then continue. Do not re-ask completed intake or replay every question.
- **Revision:** retain earlier statements as history, invalidate dependent derived claims/renderings, and ask only the new question needed to reconcile them.
- **Export gate later:** placeholders, unconfirmed derived numbers, and disputed claims cannot silently appear as settled external assertions. A qualitative account is often the correct finished output.

#### Failure modes the proposed design must test
- Leading recommended answers contaminate recollection.
- Full-frontier batches overload users and ask downstream questions prematurely.
- Strong verbs convert coordination/contribution into ownership.
- A collective result becomes sole personal causation.
- A user estimate becomes an exact point number or an annualized business case.
- Repeatedly probing a missing metric pressures invention.
- A polished STAR draft overwrites raw context or creates apparent evidence through repetition.
- Role targeting erases old settings, invents tools, or treats every requirement as demonstrated.
- Success-only prompts lose failures, ordinary reliability, and nontraditional experience.
- Drafts with uncertain claims become export-ready because the story as a whole was confirmed.
- Parser formatting, heading edits, or localization silently drop source material.
- Restarting loses unresolved conflicts; changing a fact leaves stale derived outputs.

### Gaps
- These sequences and stop rules need evaluation with fictional cases and consenting users. Suitable later checks: can the interviewer accept no metric, preserve shared ownership, resume without repeats, reconcile a correction, and finish with useful partial data?
- No claim is made that these proposals are clinically validated, psychologically optimal, or that they improve hiring decisions.
- This research intentionally stops before implementation, integration, local career-data discovery, or an interview with the user.
