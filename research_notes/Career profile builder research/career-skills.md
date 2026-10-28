# Public career-profile and interview skills: comparative research

## 1. Which repositories best inform a sequential career-profile builder?

### Takeaway

The strongest combination for this task is vignzpie's canonical-profile scope, vbalashi's sequential claim audit, mzupan's source/confidence capture, and Reactive Resume's evidence and attribution checks. This is a static source comparison as of 2026-10-26, not a measured ranking of effectiveness. Seven career repositories were closely inspected, plus one rejected upstream discovery prompt and its verified mirror.

### Cited Findings

“Behavior” below means instructions found in prompts, not demonstrated runtime behavior. Nineteen full relevant files were read across the seven career repositories. Downloaded instructions/scripts were treated as data; none were installed or executed. No application code or private career documents were read.

#### A. vignzpie/resume-agent-skills — closest overall scope

Checked main at d21f62ec07966a6f9b7963c5d1d8c736265d8393, commit date 2026-04-28. Full files read: career-profile-builder/SKILL.md; career-profile-builder/references/branching-questions.md; career-profile-builder/references/profile-template.md. Main skill blob: 25326ff45a35a1a5a1238a45682992ed599befac. [Checked commit][A0]

- The skill distinguishes a comprehensive career profile from job-specific resumes. Passes cover level/track triage, reverse-chronological skeleton, selected-role deep dives, and coverage/approved-framing review. Imports prefill known material. Rules prohibit invented numbers and inflated ownership; uncertain claims and user-approved sensitive wording are preserved. It confirms the skeleton before depth, modifies affected sections of an existing profile, and avoids automatically starting tailoring. [Full skill][A1]
- Its adaptive bank covers engineering, EM, PM, design, data/ML, marketing, sales, operations/CS, academia, and custom tracks. Questions probe decisions, alternatives, before/after changes, scope, and individual contribution. Interviewers select productive follow-ups and stop when answers repeat or energy fades, rather than asking the whole bank. [Full bank][A2]
- The 19-section template includes long-form experience, achievement bank, uncertainties, approved wording, public artifacts, languages, community work, and optional interests. It has an update date but no explicit stable claim IDs, source-locator fields, evidence types, or revision history. [Full template][A3]
- License read: MIT, copyright 2026 Vignesh Pai. [License text][A4]

#### B. vbalashi/master-resume-skill — most explicit sequential audit

Checked main at 5f5680143fd4c39f4646ab5999290ba65fa3484a, commit date 2026-06-07. Full files read: SKILL.md; .claude/commands/master-resume.md; shared/schema.md; shared/quality-checklist.md; scripts/validate_skill.sh. [Checked commit][B0]

- The skill separates private workspace data from reusable skill code. Extraction creates initially unreviewed atomic claims tied to career contexts. Audit asks one question, waits, and immediately updates master-profile.yaml. It checks contribution, depth, frequency, outcomes, other people's boundaries, interview explainability, freshness, target relevance, invisible automation, and confidentiality. Selected output claims must pass a completeness/risk gate. Company-specific wording belongs outside the master units. [Full skill][B1]
- The compatibility command adds identity discovery: externally recognized strengths, abilities the person dismisses, energizing/draining work, actual scope versus title, missing informal work, and desired direction. Audit supports skip, split, merge, delete, progress, and stop. Assessments need confirmation. Notably, extraction reduces month dates to years; merging retains stronger scalar ratings; generation is also offered after a broad reviewed-unit threshold. [Full command][B2]
- The documented schema separates contexts, atomic experience, identity, technologies, education, and named positioning views. Units have IDs, task/actions/results/boundaries, source filenames, confidence, completeness, contribution, freshness, workflow state, and risk. Positioning references highlighted/hidden unit IDs; an audit log records reviewed units. [Full schema][B3]
- The quality checklist adds confidentiality and cross-document consistency, but also categorical market/format and seniority advice. Those are authored assertions, not verified market facts here. [Full checklist][B4]
- The inspected validator checks package files, required literal skill text, packaging-script syntax, and one obsolete path. It does not validate a person's profile YAML or claim-state transitions. [Actual script source][B5]
- Reuse status unresolved: GitHub's license field was null and the inspected recursive tree contained no LICENSE/COPYING/NOTICE file. Public readability is established; an explicit reuse grant was not found. This is a research limitation, not legal advice. [Checked tree][B6]; [metadata endpoint][B7]

#### C. mzupan/tech-resume — evidence-aware profile and workspace

Checked main at c04dde4baed04bc0b475ec60ddb9c5274dadc093, commit date 2026-10-17. Full files read: SKILL.md; references/interview.md; templates/career-profile.md. Skill blob: ca6f95fb9905937355b6a879a4eafb1f596485a0. [Checked commit][C0]

- Routing separates import, profile discovery, target changes, bases, applications, and review. Source documents are preserved; imported claims carry source/confidence tags and date/title conflicts become questions. JD requirements receive strong/weak/missing evidence classifications. Application Q&A has a separate file and can return new facts to the master with session-level agreement. Corrections/retractions propagate. The skill also allows separately authoritative resume histories per base if the user insists. [Full skill][C1]
- Interviewing harvests existing material before asking; uses 3–6 questions per role per round; allows unknowns/skips; follows side stories; asks how metrics are known; accepts nonnumeric outcomes; saves after each role. Probes cover baselines, later durability, personal contribution, alternatives, conflict, recognition, and overlooked routine work. An authored readiness heuristic requires three scale/result facts, including one before/after. [Full interview][C2]
- The template tags facts with sources/confidence, records users' own phrases, story categories, and skill depth/last use. Target preferences and standing writing rules live in frontmatter. Stable claim IDs and normalized evidence entities are absent. [Full template][C3]
- License read: MIT, copyright 2026 Mike Zupan. [License text][C4]

#### D. reactive-resume/reactive-resume — accomplishment mining and facts ledger

Checked main at 5d247c59de925b04e6e658300524812c7f544ec4, commit date 2026-10-25. Full prompt files read: plugins/reactive-resume/skills/resume-bullet-writer/SKILL.md and its references/question-bank.md. Skill blob: c0113ce71f188ca20bae59c99232c229aa6496b2. Other references downloaded to temporary storage were not treated as reviewed evidence. [Checked commit][D0]

- The skill triages existing bullets, offers pace choices/budgets, then mines real episodes. It checks measurement source, ownership, competing causes, confidentiality, and explainability. Derived arithmetic needs confirmation; inferred facts cannot reach finished copy. Its ledger distinguishes user statements, estimates, documents, confirmed calculations, and inference. The ordinary ledger stays in chat. Optional connected Career Knowledge persistence preserves the user's source wording and separate fact identifiers. [Full skill][D1]
- The bank turns generic duties into one concrete incident, personal actions, what followed, and recognition. For memory failures it suggests legitimately accessible notes/calendar/history. For underselling it probes reliance, unnoticed work, recognition, and absence consequences. The outcome ladder stops at the last supportable link; number probes include baseline and time window. It also describes accurate scope/qualitative alternatives when numbers are unavailable. [Full question bank][D2]
- License read: MIT, copyright 2026 Amruth Pillai. [License text][D3]

#### E. Jeff-Kazzee/career-coach — evidence, constraints, and nontraditional paths

Checked prod at 64e780ea795000ca396e2b0b946cb2fb19da6435, commit date 2026-10-08. Full files read: SKILL.md; references/career-intake.md; assets/career-intake-template.md. Skill blob: 6b68a9121d65602b4ed0f6a3e1c138bd9d570da1. [Checked commit][E0]

- The skill distinguishes demonstrated from claimed skill, prohibits invented metrics/odds, minimizes sensitive data, respects functional constraints, and forbids claiming persistence the runtime lacks. Modes cover resumes, LinkedIn, GitHub, portfolio, advancement, and nontraditional work. It honors one-question preferences, although the default favors minimal intake and a concrete next artifact. [Full skill][E1]
- Intake separates known, unknown, and assumptions; hard/soft/unresolved constraints; claimed skills from proof, recency, feedback, and missing proof. It labels unpaid/informal work accurately. Its declared goal is a usable baseline and short action plan rather than a life-history interview. [Full intake][E2]
- The template covers direction, skills/proof, experience, existing materials, constraints, self-assessment, and coach assumptions. It lacks per-achievement ownership/provenance fields. [Full template][E3]
- License read: MIT, copyright 2026 Jeff Kazzee. [License text][E4]

#### F. varunr89/resume-tailoring-skill — explicit branching, application-first library

Checked master at 9a4a0f20f5983d1b533627b8c5191acd1ca0cd89, commit date 2026-03-01. Full files read: skills/resume-tailoring/SKILL.md (1,319 lines); root branching-questions.md. [Checked commit][F0]

- The pipeline requires a resume library and JD, explicitly excluding generic from-scratch work. Optional discovery is triggered by gaps. Captured experiences have context, scope, draft wording, and match confidence. Approved outputs can be re-ingested into the library with source/reframing metadata. The skill proposes role/title reframing and numerical match/coverage scores; these are authored internal rubrics, not validated probabilities. [Full skill][F1]
- The reference branches into direct, indirect, adjacent, personal-learning, or absent experience. It probes production/testing, individual role, challenges, scale, and outcomes. Vague soft-skill replies receive reframing or episode questions. Recent-work prompts include small improvements and mentoring. It stops after two or three unproductive attempts, cross-references earlier answers, and prioritizes repeated gaps across multiple jobs. [Full branching bank][F2]
- License read: MIT, copyright 2025 Varun Ramesh. [License text][F3]

#### G. hsrasheed/ai-leadership-coach — conversational motivation and direction

Checked main at 80bb6e6bc0e0351724f9db09087ac3ce12557284, commit date 2026-05-12. Read full README.md, including its complete embedded system prompt; blob c56f11e23da89f73157a29bd753bc47dedef1ed1. [Checked commit][G0]

- The prompt asks for career artifacts and mandatory personality-assessment results; conversational intake covers energy, motivation, strengths/wins, avoidance, and next-role aspirations. It produces a living development plan. Return sessions branch into accountability, challenges, decisions, and reflection. It does not define accomplishment provenance, ownership audit, or durable storage. [Full original prompt][G1]
- License read: MIT, copyright 2026 hsrasheed. [License text][G2]

### Inferences

These are researcher's judgments, not repository claims.

- A is the closest scope foundation. Add a one-question controller, per-claim sources, IDs, and change history. Its target-driven selection and older-role compression belong in output views, not canonical storage. Do not adopt achievement-count assertions as proven quality thresholds. [A1][A1], [A3][A3]
- B offers the strongest sequential audit but could exhaust users with eight checks per atom. Keeping stronger scalar ratings when merging can inflate certainty. Its standard selected-claim gate is safer than the compatibility command's weaker global completion/selection rules. Licensing uncertainty favors independent wording rather than copied implementation. [B1][B1], [B2][B2], [B5][B5]
- C has strong correction and provenance habits; adapt question batches to sequential interaction. A single factual record should retain conflicting histories as unresolved claims, not separately authoritative base histories. Count-based readiness must not pressure the user into fabricated metrics. [C1][C1], [C2][C2]
- D offers the best inspected checks for causal overreach and inference. Its final bullets are too compressed to be the source of truth. Naming a dashboard remains self-report until evidence is supplied; chat-only ledgers cannot guarantee durable continuity. [D1][D1]
- E is a useful optional direction/constraint module, but its deliberately small baseline will stop too early for exhaustive discovery. Keep private constraints and coach hypotheses separate from publishable facts. [E2][E2]
- F supplies excellent branch categories and stopping behavior, but re-ingested polished outputs can launder repeated phrasing into apparent fact. Match scores must remain separate from factual confidence and hiring odds. Preserve official titles apart from display labels. [F1][F1]
- G contributes useful energy/recognition prompts; mandatory personality data and trait explanations may anchor interpretation before behavioral evidence. Do not require assessments in the proposed builder, or treat discomfort as evidence of the correct next step. [G1][G1]

### Gaps

No execution benchmark, recall study, hallucination audit, completion-rate study, or ATS/hiring experiment was conducted. None of the inspected prompt sets is established here as a finished, validated multi-channel canonical-profile system. No ancestry relationship is asserted between A and F merely because both contain a similarly named question-bank file. B's reuse grant remains unresolved.

## 2. Which prompt patterns and persistence ideas should an original builder borrow?

### Takeaway

Use an adaptive interviewer over a structured claim store: breadth first, one concrete episode next, ownership/evidence next, then user-approved interpretation. Persist rich material before deciding what belongs in outward-facing copy. These are proposed design choices, not established effectiveness claims.

### Cited Findings

- A separates skeleton review from deep discovery and preserves approved boundaries. [Passes][A1]; [template][A3]
- B separates atomic experience from target positioning and updates after answers. [Schema][B3]; [audit command][B2]
- C records source/confidence and asks how measurements are known. [Interview][C2]; [template][C3]
- D checks competing causes, distinguishes provenance categories, and keeps inferred facts out of final output. [Checks and ledger][D1]
- F explicitly branches by type of experience and stops unsuccessful probes. [Branching bank][F2]

### Inferences

The following patterns are original paraphrases, not copied source text. “Grilling” should mean challenging ambiguity and overstatement, with permission to be uncertain, skip, correct, or pause.

1. **Import as unconfirmed claims.** If the user later chooses to provide files, extract candidate statements with source locators and keep conflicts visible. Ask about ambiguity rather than repeating everything. An old resume is a source assertion, not independent validation. Antecedent: [C's import workflow][C1].
2. **Map the career before diving in.** Establish roles, projects, promotions, concurrent work, and meaningful unpaid contexts. Preserve month precision and approximate dates. Suggest episodes based on missing information and user interest, not employer prestige alone. Antecedent: [A's passes][A1].
3. **Exactly one pending substantive question.** Select the next unresolved field privately; ask, wait, and save. One answer may resolve several fields, so skip redundant follow-ups. Persist raw answer, proposed facts, confidence changes, and pending state. Antecedent: [B's audit][B2].
4. **Recover an episode before accepting an adjective.** For leadership or expertise claims, ask for an actual event: prior situation, decisions, actions, obstacles, others' roles, changed state, and how it was recognized. Include failures, maintenance, and unfinished work. Antecedent: [D's concrete-incident questions][D2].
5. **Branch on contribution.** Separate observing, assisting, implementing, deciding, leading, and maintaining. Ask what alternatives the user considered and what other people owned. Team outcomes and individual actions should be separate related claims. Antecedents: [B's schema][B3]; [A's bank][A2].
6. **Branch on evidence.** Distinguish exact documented values, recollected estimates, confirmed calculations, and unsupported guesses. For percentages, recover baseline, denominator, time window, measurement method, and scope. Test competing explanations before implying causality. Qualitative outcomes can remain qualitative. Antecedent: [D's checks][D1].
7. **Recover invisible work without inventing prestige.** Probe what others relied on, what improved routinely, what broke and was repaired, or what the user created beyond assigned duties. Suggest later lookup in legitimately available records. Confidence and enthusiasm are not proof. Antecedents: [C's brag prompts][C2]; [D's memory prompts][D2].
8. **Store limitations as first-class information.** Retain disallowed implications, collaboration boundaries, uncertainty, confidentiality, and approved external wording. Later output may shorten a claim but cannot expand ownership, certification, recency, or causality. Antecedent: [A's profile template][A3].
9. **Separate direction from history.** Collect energizers, drains, desired work, and constraints as preferences. Keep target positioning and seniority hypotheses distinct from employment titles and historical facts. Antecedents: [B's identity questions][B2]; [E's intake][E2].
10. **Stop with explicit unfinished state.** After unproductive probes, preserve a gap. Offer defer-for-evidence, skip, revisit, choose another episode, correct an answer, or stop. Resume from stored state. Completion means user-accepted coverage and known gaps, not an accomplishment quota. Antecedents: [F's stopping rules][F2]; [B's audit controls][B2].

Proposed record, for later design rather than implementation: separate career contexts, narrative episodes, atomic claims, evidence references, preferences, positioning views, and interview state. Claims should retain IDs, original wording, normalized statement, source locator/type, individual contribution, team context, event period, metric details, skill recency, evidence status separately from memory confidence, confidentiality/public-use state, approved wording, retractions, and revision links. Evidence can remain a user-described artifact without uploading it. Episodes connect facts into richer portfolio/interview stories. Target views reference facts rather than rewriting them. Antecedents: [B's schema][B3]; [C's template][C3].

Skill-first recommendation: begin with an original provider-neutral interview skill, documented structured record, and readable projection. A CLI becomes useful when deterministic validation, transactional saves, migrations, search, or multiple writers justify it. This is a scope-based recommendation. CV, LinkedIn, portfolio, and GitHub rendering and integrations remain later work.

### Gaps

The proposed record is not implemented or validated. No storage format, CLI language, or integration choice was made. Save-after-answer prose does not establish atomicity, crash recovery, concurrency, migration, or redaction. User testing is needed to assess recall and fatigue; source inspection cannot establish either.

## 3. What was rejected, how were sources checked, and what failure modes remain?

### Takeaway

Skills directories and repository descriptions were discovery leads, not sufficient evidence of relevance. A skill under a career directory proved to be a product-specification interview. Relevance scoring, factual confidence, verification, and hiring probability must stay distinct.

### Cited Findings

#### Rejected or limited candidates

- **Rejected as a career-profile source:** firstsun-dev/skills, external/career/discovery-interview/SKILL.md. Full prompt reading showed a product-spec interview covering architecture, data, integrations, deployment, and implementation handoff. It elicits requirements, not career accomplishments. Its uncertainty/tradeoff/readback techniques are transferable, but it is not counted as a career system. [Read mirror][H1]
- **Original followed:** firstsun's skills-lock.json identifies parcadei/continuous-claude-v3 and .claude/skills/discovery-interview/SKILL.md. Original main checked at d07ff4b06b62f43771bc0c927d0211b734d6149e (2026-01-26); firstsun main checked at 4684830a13480504c95e5669d7d74b2504e1bd85 (2026-10-07). Downloaded original and mirror text had identical SHA-256 c052060f2c1e597de660bce793aefa30fa1da67f8c3c4468afdec4ac96b08589. Firstsun's README identifies external skills as attributed third-party mirrors. Original metadata says MIT; firstsun's top-level license field was null. [Lockfile][H2]; [original prompt][H3]; [mirror policy][H4]; [original metadata][H5]
- **Included as narrow contrasts:** F has genuine branching but requires JD/library inputs; G mainly produces leadership development plans; E intentionally favors a usable minimum baseline. Their inclusion reflects those mechanisms, not equivalence to a master-profile builder. [F scope][F1]; [G prompt][G1]; [E intake][E2]
- **Screened only, not close-reviewed or scored:** lznauy/interviewer, archlizheng/interview-self-introduce, agentenatalie/get-job.skill, and A's resume-tailor appeared in discovery. No detailed quality conclusion is claimed because their full prompts were not inspected. [lznauy lead][J1]; [archlizheng lead][J2]; [agentenatalie lead][J3]; [tailor lead][J4]

#### Methodology and reproducibility

Two live web-search batches used these exact queries:

- github "SKILL.md" "career" "questions"
- github "SKILL.md" "resume" "interview"
- github "master resume" "prompt"
- github career coach system prompt accomplishments questions
- "discovery-interview" "SKILL.md" career github
- "career profile" "SKILL.md" discovery github
- github career "one question at a time" "prompt"

GitHub/skills-directory results were leads only. Reddit and vendor/PDF anecdotes surfaced but were not used for effectiveness claims. Promising originals were checked through GitHub repository metadata, default-branch commit, and recursive-tree APIs. Actual raw files were fetched at pinned SHAs. Patterns: https://api.github.com/repos/{owner}/{repo}, /commits/{ref}, /git/trees/{sha}?recursive=1, and https://raw.githubusercontent.com/{owner}/{repo}/{sha}/{path}. Inspected commit dates precede the cutoff.

Selection sought contrasting mechanisms: canonical long-form discovery, atomic sequential auditing, engineering evidence intake, cross-occupation accomplishment mining, broad/nontraditional coaching, explicit branching, and leadership direction. The bounded set is seven career repositories plus one generic original/mirror pair.

Full-read count: A three files, B five, C three, D two, E three, F two, G one = nineteen. The generic mirror's full prompt, README, and lockfile were also read; byte equality checks its upstream prompt content. Truncated prompt outputs were reread in smaller segments. Supporting READMEs searched only for attribution are not counted as full prompt reviews. Downloaded but unread references were excluded from findings.

Public-source downloads/API snapshots were stored temporarily at C:\Users\santi\AppData\Local\Temp\career-skills-research. Only this notes file was written to the repository. Downloaded scripts and install commands were not executed.

### Inferences

Failure modes worth designing against:

- **Fluent gap filling:** ordinary questionnaires can end in polished unsupported copy. Keep unresolved fields visible and prevent inferred statements from entering approved facts. [D ledger][D1]
- **Question overload:** fixed per-atom loops or long batches may defeat sequential interaction. Use adaptive selection, review checkpoints, skips, and pauses. [B audit][B2]; [C pacing][C2]
- **Comfort mistaken for truth:** interview readiness, user confidence, or naming a dashboard are signals, not independent evidence. Preserve self-report and observed/document-backed support separately. [B ratings][B3]; [D evidence check][D1]
- **Causal inflation:** a before/after change does not by itself establish an individual's causal effect. Store baselines, windows, other changes, and attribution boundaries; use qualitative claims when necessary. [D checks][D1]
- **Tailored copy becomes history:** re-importing successive polished outputs can magnify weak claims. Derived outputs should stay separate; only genuinely new confirmed source facts return to the canonical record. [F library update][F1]
- **Compression destroys recall:** older work, learning-level skills, and unshipped projects can be omitted from resumes while retained accurately in canonical history. [A selection guidance][A1]
- **Two entrypoints drift:** standard and compatibility prompts can disagree on generation eligibility. Maintain one normative contract and later test contradictions, retractions, resumptions, and prohibited inference. A packaging text check is not data validation. [B skill][B1]; [B command][B2]; [B validator][B5]
- **Redaction comes too late:** asking for authorized summaries/redacted material must precede intake, since pasting internal documents already sends them to the provider. [D material guidance][D2]
- **Reuse assumptions:** retain actual license/copyright notices when adapting MIT material. A README's informal attribution comment or public readability is not a substitute for the license text. The six career LICENSE files linked above were read; B's grant remains unresolved.

### Gaps

The search is bounded, not exhaustive. Search rank, stars, and install counts were not used as quality evidence. The six career MIT labels were corroborated by actual LICENSE texts. The rejected parcadei source's MIT metadata was checked, but its license text was not independently read. No quantitative ATS, discoverability, response-rate, hiring, or time-saving assertion was adopted; repository examples and thresholds are not empirical results.

No integrations, installation, application changes, private-profile construction, or hiring-market recommendations are included.

#### Source link targets (pinned originals unless identified as search leads)

[A0]: https://github.com/vignzpie/resume-agent-skills/commit/d21f62ec07966a6f9b7963c5d1d8c736265d8393
[A1]: https://github.com/vignzpie/resume-agent-skills/blob/d21f62ec07966a6f9b7963c5d1d8c736265d8393/career-profile-builder/SKILL.md
[A2]: https://github.com/vignzpie/resume-agent-skills/blob/d21f62ec07966a6f9b7963c5d1d8c736265d8393/career-profile-builder/references/branching-questions.md
[A3]: https://github.com/vignzpie/resume-agent-skills/blob/d21f62ec07966a6f9b7963c5d1d8c736265d8393/career-profile-builder/references/profile-template.md
[A4]: https://github.com/vignzpie/resume-agent-skills/blob/d21f62ec07966a6f9b7963c5d1d8c736265d8393/LICENSE
[B0]: https://github.com/vbalashi/master-resume-skill/commit/5f5680143fd4c39f4646ab5999290ba65fa3484a
[B1]: https://github.com/vbalashi/master-resume-skill/blob/5f5680143fd4c39f4646ab5999290ba65fa3484a/SKILL.md
[B2]: https://github.com/vbalashi/master-resume-skill/blob/5f5680143fd4c39f4646ab5999290ba65fa3484a/.claude/commands/master-resume.md
[B3]: https://github.com/vbalashi/master-resume-skill/blob/5f5680143fd4c39f4646ab5999290ba65fa3484a/shared/schema.md
[B4]: https://github.com/vbalashi/master-resume-skill/blob/5f5680143fd4c39f4646ab5999290ba65fa3484a/shared/quality-checklist.md
[B5]: https://github.com/vbalashi/master-resume-skill/blob/5f5680143fd4c39f4646ab5999290ba65fa3484a/scripts/validate_skill.sh
[B6]: https://github.com/vbalashi/master-resume-skill/tree/5f5680143fd4c39f4646ab5999290ba65fa3484a
[B7]: https://api.github.com/repos/vbalashi/master-resume-skill
[C0]: https://github.com/mzupan/tech-resume/commit/c04dde4baed04bc0b475ec60ddb9c5274dadc093
[C1]: https://github.com/mzupan/tech-resume/blob/c04dde4baed04bc0b475ec60ddb9c5274dadc093/SKILL.md
[C2]: https://github.com/mzupan/tech-resume/blob/c04dde4baed04bc0b475ec60ddb9c5274dadc093/references/interview.md
[C3]: https://github.com/mzupan/tech-resume/blob/c04dde4baed04bc0b475ec60ddb9c5274dadc093/templates/career-profile.md
[C4]: https://github.com/mzupan/tech-resume/blob/c04dde4baed04bc0b475ec60ddb9c5274dadc093/LICENSE
[D0]: https://github.com/reactive-resume/reactive-resume/commit/5d247c59de925b04e6e658300524812c7f544ec4
[D1]: https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/plugins/reactive-resume/skills/resume-bullet-writer/SKILL.md
[D2]: https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/plugins/reactive-resume/skills/resume-bullet-writer/references/question-bank.md
[D3]: https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/LICENSE
[E0]: https://github.com/Jeff-Kazzee/career-coach/commit/64e780ea795000ca396e2b0b946cb2fb19da6435
[E1]: https://github.com/Jeff-Kazzee/career-coach/blob/64e780ea795000ca396e2b0b946cb2fb19da6435/SKILL.md
[E2]: https://github.com/Jeff-Kazzee/career-coach/blob/64e780ea795000ca396e2b0b946cb2fb19da6435/references/career-intake.md
[E3]: https://github.com/Jeff-Kazzee/career-coach/blob/64e780ea795000ca396e2b0b946cb2fb19da6435/assets/career-intake-template.md
[E4]: https://github.com/Jeff-Kazzee/career-coach/blob/64e780ea795000ca396e2b0b946cb2fb19da6435/LICENSE
[F0]: https://github.com/varunr89/resume-tailoring-skill/commit/9a4a0f20f5983d1b533627b8c5191acd1ca0cd89
[F1]: https://github.com/varunr89/resume-tailoring-skill/blob/9a4a0f20f5983d1b533627b8c5191acd1ca0cd89/skills/resume-tailoring/SKILL.md
[F2]: https://github.com/varunr89/resume-tailoring-skill/blob/9a4a0f20f5983d1b533627b8c5191acd1ca0cd89/branching-questions.md
[F3]: https://github.com/varunr89/resume-tailoring-skill/blob/9a4a0f20f5983d1b533627b8c5191acd1ca0cd89/LICENSE
[G0]: https://github.com/hsrasheed/ai-leadership-coach/commit/80bb6e6bc0e0351724f9db09087ac3ce12557284
[G1]: https://github.com/hsrasheed/ai-leadership-coach/blob/80bb6e6bc0e0351724f9db09087ac3ce12557284/README.md
[G2]: https://github.com/hsrasheed/ai-leadership-coach/blob/80bb6e6bc0e0351724f9db09087ac3ce12557284/LICENSE
[H1]: https://github.com/firstsun-dev/skills/blob/4684830a13480504c95e5669d7d74b2504e1bd85/external/career/discovery-interview/SKILL.md
[H2]: https://github.com/firstsun-dev/skills/blob/4684830a13480504c95e5669d7d74b2504e1bd85/skills-lock.json
[H3]: https://github.com/parcadei/Continuous-Claude-v3/blob/d07ff4b06b62f43771bc0c927d0211b734d6149e/.claude/skills/discovery-interview/SKILL.md
[H4]: https://github.com/firstsun-dev/skills/blob/4684830a13480504c95e5669d7d74b2504e1bd85/README.md
[H5]: https://api.github.com/repos/parcadei/Continuous-Claude-v3
[J1]: https://github.com/lznauy/interviewer/blob/main/SKILL.md
[J2]: https://github.com/archlizheng/interview-self-introduce
[J3]: https://github.com/agentenatalie/get-job.skill
[J4]: https://github.com/vignzpie/resume-agent-skills/blob/main/resume-tailor/SKILL.md
