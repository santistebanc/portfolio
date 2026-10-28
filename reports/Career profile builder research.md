# Build career evidence before polishing profiles

**Research date: 2026-10-26**

**Build an original, small interview skill around an explicitly validated, persisted career-evidence model.** Borrow complementary techniques rather than install one repository wholesale: vignzpie supplies profile breadth, vbalashi sequential auditing, mzupan provenance habits, and Reactive Resume story mining and implemented fact/story structures. Keep experience, projects, skills, accomplishments, uncertainties, and supporting material authoritative; CV and portfolio wording will be later projections. Start with a skill because interview policy needs refinement before a larger tool is justified. A CLI becomes worthwhile when reliable validation, atomic saves, revision checks, migrations, search, or multiple writers exceed what the host provides. These are design recommendations from inspection, **not proven hiring interventions**. Implementation, installations, personal-data intake, and integrations remain deferred.

## Source inspection supports a composition, not an off-the-shelf winner

### What the commissioned research actually checked

This synthesis read the commissioned notes in full: [career-skills.md](../research_notes/Career%20profile%20builder%20research/career-skills.md), [profile-data.md](../research_notes/Career%20profile%20builder%20research/profile-data.md), and [interview-methods.md](../research_notes/Career%20profile%20builder%20research/interview-methods.md). Their upstream inspections are the evidence base; this writing pass did not rerun them. The first records **19 full relevant files across seven career repositories**. The second compares six data-model/tool sources. The third retains six interview-source families plus two local skills. Reactive Resume appears throughout; these categories overlap and must not be added into a grand total.

Researchers followed discovery results to original prompts, schemas, code, and licenses. Marketplace listings and mirrors were not accepted as independent quality evidence. A career-labelled discovery-interview mirror proved to elicit product specifications; its identical upstream prompt was rejected as a career system, not counted twice ([original parcadei prompt](https://github.com/parcadei/Continuous-Claude-v3/blob/d07ff4b06b62f43771bc0c927d0211b734d6149e/.claude/skills/discovery-interview/SKILL.md)). Screened-only leads were not scored. Similarly named branching banks do not establish shared ancestry.

Conclusions refer to pinned commits, not moving branches or releases. CareerProof's HEAD was captured, but its commit timestamp remained unchecked after API limiting. University pages were read on the research date without archival snapshots. Prompts establish intended behavior; runtime source establishes particular structures or checks, not successful end-to-end operation. No downloaded code was executed, no personal career files were read, and no hiring, ATS, recall, completion-rate, security, or round-trip benchmark was conducted. The notes preserve exhaustive inspected-file lists.

### The seven career repositories offer different strengths

The comparison paraphrases actual instructions. Adaptations are this report's judgments. MIT statuses reflect inspected license texts; retain applicable notices when copying substantial material.

| Original owner and inspected entry point | Actual contribution | Borrow, adapt, or reject | Support and checked license |
|---|---|---|---|
| [vignzpie/resume-agent-skills — career-profile-builder/SKILL.md](https://github.com/vignzpie/resume-agent-skills/blob/d21f62ec07966a6f9b7963c5d1d8c736265d8393/career-profile-builder/SKILL.md) | Timeline skeleton, role discovery, deep dives, coverage and approved framing | Best scope foundation; add claim IDs, provenance, revisions and serial control | Prompt, branching reference, profile template; MIT |
| [vbalashi/master-resume-skill — SKILL.md](https://github.com/vbalashi/master-resume-skill/blob/5f5680143fd4c39f4646ab5999290ba65fa3484a/SKILL.md) | Unreviewed atomic claims, one-question audit, immediate updates, selection gates | Borrow audit/state separation; avoid stronger-rating merges and date compression | Prompt/schema documentation, packaging validator; reuse grant unresolved |
| [mzupan/tech-resume — SKILL.md](https://github.com/mzupan/tech-resume/blob/c04dde4baed04bc0b475ec60ddb9c5274dadc093/SKILL.md) | Source/confidence tags, conflict questions, corrections, original wording | Borrow provenance; replace batches and metric quotas | Prompt, interview reference, Markdown template; MIT |
| [reactive-resume/reactive-resume — resume-bullet-writer/SKILL.md](https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/plugins/reactive-resume/skills/resume-bullet-writer/SKILL.md) | Incident mining, fact ledger, attribution and measurement checks | Strong causal/estimate safeguards; persist beyond chat and retain rich stories | Prompts plus separately inspected schema/database source; MIT |
| [Jeff-Kazzee/career-coach — SKILL.md](https://github.com/Jeff-Kazzee/career-coach/blob/64e780ea795000ca396e2b0b946cb2fb19da6435/SKILL.md) | Demonstrated versus claimed skills, constraints, nontraditional work | Borrow optional intake; minimum baseline stops too early for deep discovery | Prompt, intake reference/template; MIT |
| [varunr89/resume-tailoring-skill — skills/resume-tailoring/SKILL.md](https://github.com/varunr89/resume-tailoring-skill/blob/9a4a0f20f5983d1b533627b8c5191acd1ca0cd89/skills/resume-tailoring/SKILL.md) | JD/library-led discovery, direct/adjacent/learning/absent branches | Borrow branching/stopping; reject output re-ingestion as factual authority | Prompt and branching reference; MIT |
| [hsrasheed/ai-leadership-coach — README.md embedded prompt](https://github.com/hsrasheed/ai-leadership-coach/blob/80bb6e6bc0e0351724f9db09087ac3ce12557284/README.md) | Motivation, energy, aspirations, returning-session reflection | Borrow optional preferences; reject mandatory personality assessments | Embedded prompt; no durable evidence model established; MIT |

**vignzpie is closest to the requested scope.** Its branching reference covers engineering and non-engineering tracks; its 19-section template retains long-form history, achievements, uncertainties, approved wording and community work. Preserve that breadth. Older-role compression and target-driven selection should affect views, not erase history. Its update date is not claim provenance or revision history ([profile template](https://github.com/vignzpie/resume-agent-skills/blob/d21f62ec07966a6f9b7963c5d1d8c736265d8393/career-profile-builder/references/profile-template.md)).

**vbalashi contributes the clearest serial audit**, including contribution, boundaries, explainability, confidentiality, and skip/split/merge controls. Contexts, atomic units, and positioning views are useful separations. However, its compatibility command reduces month dates to years and retains stronger scalar ratings during merges; neither preserves precision or uncertainty. Its validator checks packaging, not profile data or transitions. Do not call it an implemented validated career store. No explicit reuse grant was found; independently write the policy ([command](https://github.com/vbalashi/master-resume-skill/blob/5f5680143fd4c39f4646ab5999290ba65fa3484a/.claude/commands/master-resume.md), [validator](https://github.com/vbalashi/master-resume-skill/blob/5f5680143fd4c39f4646ab5999290ba65fa3484a/scripts/validate_skill.sh)).

**mzupan adds provenance and correction discipline**: preserve sources, question date/title conflicts, ask how numbers are known, and accept qualitative outcomes. Adapt three-to-six-question rounds into serial selection. Its readiness count requiring several scale/result facts is an authored heuristic, not a reason to pressure numbers. Reject separately authoritative resume histories: differing accounts belong in one conflict-aware model ([interview reference](https://github.com/mzupan/tech-resume/blob/c04dde4baed04bc0b475ec60ddb9c5274dadc093/references/interview.md)).

**Reactive Resume supplies complementary story/evidence checks**: distinguish statements, estimates, documents, confirmed calculations and inference; examine competing causes; stop at the last supported outcome. Its interview-prep reference adds reflection, one-question mining, and correction. Its ordinary bullet-writing ledger stays in chat unless connected persistence exists. Its story schema permits empty fact references and does not require every claim's confirmation; good prompts do not close that schema gap ([story-mining reference](https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/plugins/reactive-resume/skills/interview-prep/references/story-bank.md)).

The remaining three contribute narrower modules. Jeff-Kazzee's known/unknown/assumption and skill/proof distinctions support inclusive intake, not deep accomplishment provenance. Varun's bounded branches distinguish transferable experience from production work; its match scores are uncalibrated rubrics, and re-ingesting polished outputs risks laundering wording into evidence. Hsrasheed's energy and aspiration questions help direction; personality results do not prove historical behavior or belong as mandatory intake. Preserve official titles separately from display language, and preferences separately from achievements.

## Evidence models matter more than résumé schemas

**Reactive Resume's separate career model is the best inspected implemented reference**, rather than its presentation-oriented resume model. Facts have source kind/ID/excerpt; stories have situation, task, action, result, reflection and fact links. Database definitions add ownership, status, timestamps, text revisions, unique source keys, and generated-artifact input versions. These are actual source structures, although the product was not exercised. Text revisions are not full metric/source history, and hidden fields or application scope are not publication permissions ([career schema](https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/packages/schema/src/career.ts), [database definitions](https://github.com/reactive-resume/reactive-resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/packages/db/src/schema/career.ts)). The legacy AmruthPillai/Reactive-Resume URLs in the data notes refer to this same family.

**CareerProof is a close skill-first reference.** wyl000bdml-sys/CareerProof's skill extracts ownership, sources and confidentiality, separates direct/transferable/unsupported evidence, and restricts metric publication. Its schema reference and inventory add project IDs, collaborators, skills, source paths and public flags. These are flexible templates, not executable validators. Dates/metrics remain free text, source paths lack captured revisions/locators, and the stricter reference prompt is richer than the top-level prompt. Borrow evidence-to-requirement links and disclosure rules; add serial discovery, revisions and validation. Reject its uncalibrated fit score as a success prediction ([skill](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/skills/careerproof/SKILL.md), [schema reference](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/skills/careerproof/references/schemas.md)).

**jchoi2x's Career Knowledge Base Schema (CKBS)** separates organizations, engagements, projects, artifacts and accomplishments; an accomplishment has one engagement or project parent, contribution and evidence references. But full calendar dates, public visibility defaults, absent confirmation/history and unenforced cross-record ID uniqueness need redesign. No license declaration or verified exporter was found. Study the concepts and author a smaller original model; do not assume copying permission ([pinned ckb.schema.json](https://gist.github.com/jchoi2x/5d2d53d49ffc708fd95871ff2bed0bc8/6f618559a56220d4041cc84f87365c48f0686a22)).

**JSON Resume should be an export contract.** Its standard supports partial dates and extensions, but highlights are strings and skills lack evidence relationships. Extension acceptance does not establish preservation across editors/themes ([canonical schema](https://github.com/jsonresume/jsonresume.org/blob/69b6c4863dc18c8819bca5c6842820b7d6806e89/packages/schema/schema.json)). RenderCV's models and skill concern editing/rendering; missing end dates can become ongoing employment, so an adapter must distinguish unknown from current ([date-bearing entry](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/src/rendercv/schema/models/cv/entries/bases/entry_with_complex_fields.py)). YAMLResume's converter flattens highlights into summary text and enumerates supported sections; its generation prompt invents example careers. Borrow formatting discipline, not synthetic intake or round-trip assumptions ([converter](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/packages/json2yamlresume/src/converter.ts), [generation prompt](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/packages/ai/src/prompts/generate.ts)). These adapters and CareerProof have inspected MIT licenses; CKBS remains unresolved.

## A neutral serial interview should recover episodes before labels

### Useful techniques have specific origins and limits

MIT CAPD's project/action/result scaffold distinguishes scale from outcome; Harvard welcomes school, volunteer and extracurricular episodes and learning from mistakes. OPM recommends open questions, planned clarification probes and trials. These support retrieval structure, not a claim that AI profile interviews improve hiring ([MIT](https://capd.mit.edu/resources/resumes-writing-about-your-skills/), [Harvard](https://careerservices.fas.harvard.edu/resources/interviewing/), [OPM guide, printed pp. 6–7 and 12–14](https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/guide/)).

mass-efa/After Access separates discovery, archive and outputs, with selected modules and ownership boundaries. Adapt its archive-first scope; replace requesting several ready-made accomplishments with episode elicitation. Its limited-access guidance names employer materials, so do not treat it as blanket upload permission ([modular archive prompt](https://github.com/mass-efa/after-access/blob/da04b4a0478a53e9cee2fed1ceffa8be8a792eff/prompts/02-modular-archive-builder.md)). career-ops-hq/career-ops separates story relevance from number confirmation; its parser shows why prose labels are fragile storage: missing Action fields drop stories and headings/tables terminate blocks. This is source-derived behavior, not a reproduced failure ([parser, initial 210 lines inspected](https://github.com/career-ops-hq/career-ops/blob/1f2ad61f7262d33a702df5d478ba09bee0d1e0c2/lib/story-bank.mjs)). Both MIT texts were inspected.

The local [grilling skill](C:/Users/santi/.codex/skills/grilling/SKILL.md) contributes dependency tracking and readback, but presents full question frontiers and recommended answers. The local [questioning skill](C:/Users/santi/.agents/skills/questioning/SKILL.md) describes stable IDs, resumable sessions, revision checks and reconsideration after edits; its launcher delegates to a shared app. These are instruction/launcher observations, not tested runtime guarantees. Borrow the state principles, reject recommended autobiographical answers, and write original instructions because reuse licenses were not established.

### Newly written recommended prompts

**This wording is original synthesis, not repository quotations.** Use each conditionally, one substantive question at a time; do not print the whole questionnaire.

| Purpose and source antecedent | Newly written prompt |
|---|---|
| Breadth before depth — vignzpie | “Which work, learning, community, or self-directed contexts belong in your history, even if they would never fit on a CV?” |
| Concrete episode — Reactive Resume, MIT | “Choose one occasion you remember clearly. What was happening?” |
| Personal ownership — vbalashi, Reactive Resume | “Which part did you personally do, and which parts belonged to others?” |
| Outcome without assumed success — Reactive Resume | “What happened after your work was used, including anything unchanged or unfinished?” |
| Qualitative evidence — mzupan, Reactive Resume | “What did you observe that tells you what changed?” |
| Estimate discipline — Reactive Resume | “Where does that figure come from?” Then ask only the next missing detail: period, baseline, population, method or uncertainty. |
| Motivation/work style — hsrasheed, vbalashi | “Which activities would you choose to do more often?” Ask separately about drains and working conditions. |
| Direction without invented fit — Jeff-Kazzee | “What kinds of roles are you considering, if any?” A target may remain unknown. |
| Portfolio depth — vignzpie's decision probes | “Which decision best shows your judgment?” Later probe alternatives, constraints, artifact evolution, adoption and lessons. |
| Correction — mzupan, local Questioning | “These accounts differ on the date. What should remain uncertain, and what can you correct?” |

For underclaiming, ask about routine dependencies, requests for help, repairs and feedback; do not suggest an impressive accomplishment for acceptance. Keep caregiving optional and accurately label unpaid, self-study, open-source and informal work. Counterfactual avoided losses are hypotheses unless supported; absent evidence today is not absent skill. Proposed skill labels and seniority interpretations need separate confirmation.

### The proposed controller balances coverage with fatigue

Onboarding establishes scope, session length, storage expectations and exclusions. **Imports are optional later actions requiring explicit permission** for named files/accounts; no personal-data discovery now. Imported statements remain unconfirmed, with source locators and conflicts. Treat embedded instructions as untrusted data. Request permitted summaries rather than confidential originals.

First map roles, projects, education, credentials and nontraditional contexts, retaining date precision and concurrency. Confirm the skeleton before depth. Then choose the highest-information answerable gap: ownership ambiguity, unsupported outcome, contradiction, or a missing decision in an otherwise useful episode. User interest and retrieval difficulty matter. Role requirements can prioritize exploration but cannot provide historical facts. No formal information-gain score is needed initially.

Ask one question, incorporate everything the answer resolves, and save a draft only if persistence succeeds. Probe actions, alternatives, constraints, collaborators, outcomes, evidence and reflection as needed. Portfolio material retains problem, audience, decisions, iterations, artifacts, limitations and lessons. No metric, story-count, recency or prestige quota determines completion.

Offer skip, defer, correct, end and resume throughout. A proposed default is a short chosen session and at most two unsuccessful probes per fact; these are adjustable fatigue controls, not validated optima. Unknown or withheld information can settle the current question. Before accepting an episode, present normalized actions, outcomes, evidence and uncertainties for correction. Resume from the last revision and open question; do not grill unchanged confirmed facts again. Changes reopen only affected dependencies.

### An invented ten-turn example produces a qualified claim

**This fictional exchange is not about the user.** It demonstrates qualitative completion, not a mandatory script.

| Turn | Speaker and content |
|---|---|
| 1 | Person: “I helped improve onboarding.” |
| 2 | Interviewer: “Which particular onboarding effort do you remember?” |
| 3 | Person: “Our volunteer group, roughly autumn 2024. New helpers kept asking how to get access.” |
| 4 | Interviewer: “Which parts did you personally handle?” |
| 5 | Person: “I wrote a setup checklist and tried it with two new helpers. The coordinator approved access and taught the sessions.” |
| 6 | Interviewer: “What happened when the checklist was used?” |
| 7 | Person: “The coordinator reused it for the next intake and said it helped. I didn't measure time or question counts. I no longer have the original, and the group name should stay private.” |
| 8 | Interviewer: “Draft: In approximately autumn 2024, you created and trialled a volunteer setup checklist with two helpers; the coordinator reused it and reported it useful. Access approval/training belonged to the coordinator. Impact is qualitative self-report; artifact unavailable; group identity private. What needs correction?” |
| 9 | Person: “That's accurate. The anonymized description can be public.” |
| 10 | Interviewer: “Accepted as your confirmed account, not independently corroborated. Save the approximate period, two-person trial scope, qualitative feedback, ownership boundary, missing artifact and anonymized-public permission. No time-saving claim.” |

## One authoritative record set should separate truth, support and permission

This is a **conceptual proposal**, not implementation or a finished schema. A small private file collection can represent one logical source of truth. Session bookkeeping lives separately; readable prose is a projection. Begin with these groups, nesting simple one-to-one records rather than normalizing everything immediately.

| Record | Minimum meaning and relationships |
|---|---|
| Profile and preferences | Stable profile ID, schema/revision, identity/contact; target roles, motivations, work style and constraints separated from history |
| Contexts and projects | Stable IDs, setting/type, organization, official role, responsibilities, links and dates; projects relate to paid, unpaid, education or self-directed contexts |
| Stories/accomplishments | Stable ID, context/project links, situation, goal, own actions/decisions, collaborators, outcome status, reflection and claim IDs |
| Claims | Raw reported wording and normalized assertion; subject/ownership, sources, confirmation, uncertainty, conflicts, publication policy and revision history |
| Evidence | Stable ID, kind, URI/local pointer, locator, captured version/time and optional hash; exact claims supported and access/disclosure limits |
| Skills | Stable ID, name/aliases and recency; demonstrations link through stories/claims to evidence; interest, exposure and demonstrated use remain distinct |
| Sessions and future views | Separate question/defer/resume state; later selections and wording reference canonical IDs/revisions rather than duplicate history |

**Confirmation, corroboration, availability and publication are independent.** User confirmation establishes their account; independent confirmation records who/what corroborates which assertion. A named but uninspected dashboard remains a reported source. Evidence can be available, described but inaccessible, no longer available, or withheld. A confidential artifact may support a public anonymized claim without becoming publishable itself. Default records to private; permissions differ for contacts, metrics, excerpts, audiences and channels.

Metrics retain type—measured value, recollected estimate/range, confirmed calculation, scale count or qualitative observation—plus unit, baseline/comparison, population, period, method/basis, attribution, source and assumptions. Calculations retain inputs and confirmation; team changes do not imply individual causation. In the example, two helpers is trial scope, not effectiveness. Unknown is never zero, and inferred annual savings never become measured outcomes.

Dates retain original wording, normalized partial value, precision, approximation and explicit ongoing status. Missing end is unknown unless current status is affirmed. IDs survive wording/date edits; source URLs include locators and revisions when available. Preserve supplied links without claiming current access or ownership.

Keep reported facts separate from interpretations, skill tags and derived prose. Unknown, explicit no, not applicable, deferred, and prefer-not-to-say are different states; withholding needs no explanation. Conflicts retain both assertions and sources until resolved. Corrections supersede prior versions with reason/time/source, preserving history and invalidating dependent calculations/views. Never select the more impressive account or strongest confidence automatically. **Derived output never becomes canonical fact automatically**, including when re-imported from an old CV.

A future save layer should validate shape, IDs, references, date semantics, permissions and revision transitions, then confirm successful persistence. Validation cannot prove truth. A skill can specify these rules, but only a host with suitable storage can enforce them. Add a CLI when these guarantees become necessary; it protects records and transactions, not autobiographical accuracy.

## A small MVP should prove honest continuity before export

The first future increment should define the interview policy and conceptual records, then exercise fictional cases without installing a third-party skill. Next add breadth inventory and one-episode capture with a persisted draft, correction checkpoint and exact resume pointer. Then add ownership, metric, evidence, confidentiality and conflict handling. Only after those work should an evidence-linked skill inventory, optional direction module and portfolio questions expand coverage. Add deterministic validation/history before real data depends on the tool; decide whether the host suffices or a CLI is justified. No integrations are needed to evaluate this sequence.

| Future evaluation scenario | Acceptance criterion |
|---|---|
| Underclaiming | Routine maintenance or unpaid work yields specific actions and observed use without invented seniority or prestige |
| Overclaiming | Team success stays distinct from personal action; unsupported leadership/causality is questioned or narrowed |
| Missing metrics | Qualitative or unknown outcomes complete the episode; no repeated demand for percentages |
| Conflicting dates | Both source assertions stay visible; no fabricated precision/current status; resolution preserves history |
| Confidential work | Restricted names, numbers and excerpts stay private; anonymized wording needs separate permission |
| Pause/resume | Revision and exact open question restore without repeating intake; failed saves are reported |
| Fact correction | Affected claims reopen; dependent calculations/drafts become stale; unrelated confirmed facts survive |

These are future acceptance criteria, **not tests required or run now**. Later consenting-user evaluation should assess burden, summary accuracy, repeat questions and recovery from correction. Hiring outcomes require separate evidence; successful storage or fluent prose does not establish them.

Future synchronization means deterministic downstream export plus factual reconciliation. Pin schema/adapter versions; a private manifest links output entries to claim IDs, canonical revision and permitted wording. JSON Resume exports approved selections, not the private vault. Declare conversion loss; CV/portfolio text cannot amend history. Outside edits become proposed patches, checked against sources and confirmed before acceptance. Conflicting channel text never silently wins.

The notes establish LinkedIn/GitHub as coaching/output destinations, not verified write APIs, authorization scopes or unattended synchronization. Plan reviewable text first; make no promise of unattended LinkedIn writes. Later posting/account access needs scoped authorization and current platform research. **Nothing was installed, deployed, integrated or published.**

### Compact source inventory and reuse boundary

The seven-repository table supplies pinned originals; the three notes supply exhaustive files and license links. This inventory locates complementary sources without double-counting Reactive Resume.

| Family | Primary reference / inspected support | Checked reuse status |
|---|---|---|
| JSON Resume | Canonical schema linked above; package license inspected | MIT |
| Reactive Resume | Career schema/database linked above, bullet-writing/interview prompts, career-system prompt | MIT; same repository across notes |
| RenderCV | Models linked above; [actual skill template](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/scripts/rendercv_skill/skill_template.j2.md) | MIT |
| YAMLResume | Converter/generation source linked above; work/project/skill schemas | MIT |
| CareerProof | Skill/schema linked above; examples and both tailoring prompts | MIT; templates, not verified validators |
| CKBS | Pinned gist linked above; full schema only | No declaration found; exporter unverified |
| After Access | Modular prompt linked above; limited-access, recovery and story prompts | MIT material/documentation license inspected |
| career-ops | Parser linked above; mode and story template | MIT; parser not executed |
| MIT / Harvard / OPM | Primary pages/guide linked above | Separate open reuse licenses unestablished here |
| Local grilling / questioning | Local files linked above; Questioning launcher also inspected | Reuse licenses unestablished; runtime untested |

Six career repositories had actual MIT texts checked; vbalashi's grant remained unresolved. CKBS is a separate unresolved case. Prefer original wording and retain applicable notices for copied MIT material. Do not infer licensing from public visibility, marketplace attribution or metadata alone.

## Conclusion

The decisive boundary is between an account worth preserving and a claim ready for public assertion. A builder must preserve incomplete, ordinary and confidential experience without upgrading certainty because it can write convincing prose. That boundary makes later outputs consistent: each can shorten the same history while retaining ownership, uncertainty and disclosure limits.

The next decision should depend on whether a small interviewer reliably recovers and resumes truthful episodes. Only when persistence and validation outgrow the host does a CLI earn its maintenance cost. The research supports that direction; it does not establish an optimal interview length, complete ready-made schema, or improved hiring effectiveness.
