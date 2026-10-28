# Career profile data models and evidence

## What do six actual primary data models enable and miss?

### Takeaway
Recommend a small private canonical career model with linked accomplishments, evidence, skills and stories, plus JSON Resume export. A presentation schema alone does not preserve all the material needed for later CV, portfolio and social-profile views. This is a design recommendation, not a hiring-performance claim.

### Cited Findings

#### 1. JSON Resume: portable interchange/export target
Checked jsonresume/jsonresume.org at 69b6c4863dc18c8819bca5c6842820b7d6806e89 (commit timestamp 2026-10-26 06:00:40 UTC).

- Actual packages/schema/schema.json permits extension properties and namespaced custom data. Accomplishments remain string arrays; skills use name/level/keywords rather than evidence relationships. Dates support year, year-month or full date; metadata includes canonical URL, version and modification time. No standard story/evidence entity or stable item ID is defined. The checked schema includes work keywords and certificate credential/expiry fields. Custom-data preservation is requested of tools, while themes need not render it: this is a convention, not demonstrated round-trip behavior. — [Pinned schema](https://github.com/jsonresume/jsonresume.org/blob/69b6c4863dc18c8819bca5c6842820b7d6806e89/packages/schema/schema.json)
- MIT license, checked in the package itself. — [Package license](https://github.com/jsonresume/jsonresume.org/blob/69b6c4863dc18c8819bca5c6842820b7d6806e89/packages/schema/LICENSE.md)

Assessment: Good destination for approved résumé content. Extensions could hold a vault technically, but a separate canonical contract avoids depending on every editor/theme retaining or understanding them.

#### 2. Reactive Resume: a résumé model AND a separate actual career knowledge model
Checked AmruthPillai/Reactive-Resume at 5d247c59de925b04e6e658300524812c7f544ec4 (2026-10-25 17:06:21 UTC).

- The résumé model has IDs, hidden flags, HTML descriptions, nested roles under employers, custom sections and layout metadata. These are editing/presentation features, not claim provenance. — [packages/schema/src/resume/data.ts](https://github.com/AmruthPillai/Reactive-Resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/packages/schema/src/resume/data.ts)
- Separate career facts have categories and a source with kind, ID and excerpt; scope can be global or application-specific. Stories retain situation/task/action/result/reflection, fact references and tags. Preferences include target roles, location, priorities and memory mode, which defaults to asking. This revision is much closer to the intended knowledge base than a résumé editor alone. — [packages/schema/src/career.ts](https://github.com/AmruthPillai/Reactive-Resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/packages/schema/src/career.ts)
- Database tables add generated IDs, user ownership, creation/update times, fact status, text revisions and a unique per-user source key. Generated artifacts retain fact/story references and an input version. Revisions contain text/timestamp rather than a complete historical source/metric object. — [packages/db/src/schema/career.ts](https://github.com/AmruthPillai/Reactive-Resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/packages/db/src/schema/career.ts)
- Structured résumé dates retain year/month precision, ongoing status and original imprecise text; display strings are synchronized from structured dates. Invalid endpoints can fall back to null, so parsing success need not mean complete understanding. — [packages/schema/src/resume/dates.ts](https://github.com/AmruthPillai/Reactive-Resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/packages/schema/src/resume/dates.ts)
- MIT. — [License](https://github.com/AmruthPillai/Reactive-Resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/LICENSE)

Assessment: Best inspected implemented reference for reusable facts, story bank, revisions and job scope. Inspected knowledge fields remain largely free text, without normalized baseline/method metrics, field-level publication permissions or skill-evidence ontology. Hidden fields and application scope should not be interpreted as confidentiality controls. Full product security/export behavior was not audited.

#### 3. RenderCV: rendering-oriented YAML and consequential date semantics
Checked rendercv/rendercv at 1d4b87bc427e4cf61c0ef49623c971b0e2224708 (2026-03-25 13:45:27 UTC).

- Actual CV model supports contact information and arbitrary section titles containing typed entries. — [src/rendercv/schema/models/cv/cv.py](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/src/rendercv/schema/models/cv/cv.py)
- Experience combines company/position with shared location, summary, string highlights and dates. A single date clears range endpoints; start without end becomes ongoing; reversed date order is rejected. — [experience.py](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/src/rendercv/schema/models/cv/entries/experience.py), [entry_with_complex_fields.py](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/src/rendercv/schema/models/cv/entries/bases/entry_with_complex_fields.py)
- Single-date input accepts imprecise text. Entries allow extra keys, while fixed CV fields reject unknown keys. Accepted extras do not become validated career semantics. — [entry_with_date.py](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/src/rendercv/schema/models/cv/entries/bases/entry_with_date.py), [base.py](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/src/rendercv/schema/models/base.py), [entry.py](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/src/rendercv/schema/models/cv/entries/bases/entry.py)
- Actual skill template separates content/design/locale/settings, embeds models, explains YAML quoting/date precedence and warns extra entry keys may pass without rendering. It is an editing/rendering skill rather than discovery interview. — [scripts/rendercv_skill/skill_template.j2.md](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/scripts/rendercv_skill/skill_template.j2.md)
- MIT. — [License](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/LICENSE)

Assessment: Good eventual document adapter. The inspected entries lack standard stable accomplishment IDs, evidence graph, story parts, privacy and revisions. Unknown end dates must not accidentally become current employment.


#### 4. YAMLResume: presentation pipeline with concrete conversion loss
Checked yamlresume/yamlresume at b28927a361c8c68f1f43442c4344f260d62dce15 (2026-10-09 09:14:23 UTC).

- Work requires company, position, start date and summary; optional end date, keywords and URL. Projects add description. Neither inspected item schema defines stable IDs, evidence relationships, story parts or provenance. — [packages/core/src/schema/content/work.ts](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/packages/core/src/schema/content/work.ts), [projects.ts](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/packages/core/src/schema/content/projects.ts)
- Skills require name and level, with optional keywords. Summary is bounded to 16–1024 characters; date strings use JavaScript parsing. — [skills.ts](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/packages/core/src/schema/content/skills.ts), [primitives.ts](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/packages/core/src/schema/primitives.ts)
- Its actual JSON Resume converter merges work/project/volunteer highlights into Markdown summary text, relocates profiles/location, and renames education/reference fields. Its output constructor enumerates supported sections rather than retaining arbitrary root extensions. This is actual lossy transformation. — [packages/json2yamlresume/src/converter.ts](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/packages/json2yamlresume/src/converter.ts)
- MIT. — [License](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/LICENSE)

Assessment: Useful downstream presentation target. Required dates/levels must not pressure intake into fabricated facts.

#### 5. CareerProof: actual skill and evidence-vault templates
Checked wyl000bdml-sys/CareerProof main HEAD 485059108e603360b85fe0588d1a8d97f7eee02f using read-only git.

- Actual skill directs extraction of ownership, sources and confidentiality, distinguishes direct/transferable/unsupported evidence, restricts metric publication and includes a quality gate. Workflow principally matches evidence and tailors truthfully with targeted follow-ups. — [skills/careerproof/SKILL.md](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/skills/careerproof/SKILL.md)
- The schema reference explicitly presents flexible YAML/JSON shapes. Projects have IDs, contribution/collaborators, source paths, skills, textual metrics with public flags, bullets and confidentiality levels. Candidate facts and target-job constraints are separate. These are templates, not executable validators in that file. — [skills/careerproof/references/schemas.md](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/skills/careerproof/references/schemas.md)
- Actual example inventory combines project privacy and metric flags; dates/metric values are free text, sources are paths without captured revision/hash/locator. — [examples/project_inventory.example.yaml](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/examples/project_inventory.example.yaml)
- Strict reference output links requirements/evidence/projects and transferable caveats; the shorter top-level prompt mainly uses empty arrays. Both request a numeric score without calibration in those prompts. — [Strict reference](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/skills/careerproof/references/truthful_resume_tailoring.md), [Top-level prompt](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/prompts/truthful_resume_tailoring.md)
- MIT; inspected package metadata calls it version 0.1.0 and a skill/template package. — [License](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/LICENSE), [pyproject.toml](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/pyproject.toml)

Assessment: Close skill-first reference. Add revisions, verification, date precision, resumable interviewing and validators. A fit score is not hiring probability.

#### 6. Career Knowledge Base Schema: closest schema design; license unresolved
Inspected jchoi2x gist ckb.schema.json, revision 6f618559a56220d4041cc84f87365c48f0686a22, also verified as gist HEAD.

- Actual schema defines organizations, engagements, projects, artifacts and accomplishments. Accomplishments retain problem/action/result/context, metrics, skills, competencies, evidence references, contribution, visibility and role-specific text. Exactly one engagement or project parent is required, separating attribution from display placement. — [Pinned CKBS](https://gist.github.com/jchoi2x/5d2d53d49ffc708fd95871ff2bed0bc8/6f618559a56220d4041cc84f87365c48f0686a22)
- Visible limitations: full calendar dates rather than partial precision; public visibility default; no claim confirmation/revision history; no artifact snapshots. ID uniqueness is described but not enforced across records. No license declaration was found in the inspected schema/gist; no exporter implementation was verified. — [Same schema](https://gist.github.com/jchoi2x/5d2d53d49ffc708fd95871ff2bed0bc8/6f618559a56220d4041cc84f87365c48f0686a22)

Assessment: Study the separation, write an original smaller schema, and do not assume permission to copy unlicensed source.

### Inferences
- Closest practical references: Reactive Resume’s separate fact/story store and CareerProof’s publication-aware skill. Others supply adapter/validation lessons.
- A source reference is not verification: a document may support a metric without supporting sole ownership.
- Scope, confidence, relevance and publication permission are independent.
- Plain text alone does not ensure reusable semantics: exporters need explicit loss contracts.

### Gaps
No UI/security/round-trip tests were run. CareerProof HEAD was captured, but not its commit timestamp after API limiting. No controlled ATS, interview-rate or hiring-success evidence was collected; make no such claims.

## Which prompt techniques and failure modes matter?

### Takeaway
Borrow source discipline, uncertainty handling and schema-specific formatting. Add persistent sequential discovery yourself; inspected prompts mostly coach, tailor, render or generate examples.

### Cited Findings
- Reactive Resume’s career prompt confines career claims to user statements/facts/documents, asks about conflicting dates/numbers, treats retrieved material as untrusted, bars private search details and prevents automatic application-local-to-global fact promotion. It distinguishes absent evidence from absent ability and declines match percentages. — [packages/ai/src/prompts/career-system.md](https://github.com/AmruthPillai/Reactive-Resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/packages/ai/src/prompts/career-system.md)
- CareerProof’s strict output attaches requirement/evidence/project links, transferable caveats and gap responses. — [Reference prompt](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/skills/careerproof/references/truthful_resume_tailoring.md)
- YAMLResume specifies lengths/enums/locale/block scalars/omitted unknowns/schema comments, but explicitly requests invented realistic career content. Borrow formatting constraints, not its factual-intake behavior. — [packages/ai/src/prompts/generate.ts](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/packages/ai/src/prompts/generate.ts)
- RenderCV embeds models/examples, explains date precedence and asks for unknown country information rather than inventing phone numbers. — [Actual skill template](https://github.com/rendercv/rendercv/blob/1d4b87bc427e4cf61c0ef49623c971b0e2224708/scripts/rendercv_skill/skill_template.j2.md)
- YAMLResume date validation checks timestamp truthiness; an input parsed to epoch zero would be rejected. This is a code-derived inference, not a reproduced runtime failure. — [primitives.ts](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/packages/core/src/schema/primitives.ts)

### Inferences
Recommended original protocol:
1. Build a timeline with approximate dates/unknowns, asking one question at a time and retaining raw answers.
2. Choose one episode: problem, stakes, constraints and why it mattered before polishing bullets.
3. Probe personal versus team contribution, decisions, alternatives, tradeoffs and scope.
4. Elicit outcomes, then examine numbers: baseline, interval, method/source, uncertainty and attribution. Accept qualitative results and unknown metrics.
5. Ask for evidence/disclosure boundaries. Save recollection as self-report; documents need not block intake.
6. Link demonstrated skills to examples; distinguish interest/exposure/demonstrated ability.
7. Reflect a structured summary for correction. Save confirmed patches with stable IDs; retain conflicts/deferred questions. Factual confirmation is separate from publication.
8. Offer derived wording while retaining the rich story/source; distinguish draft/approved text.
9. Stop when sufficient or skipped; persist a prioritized next-question queue.

Failure modes: schema-valid fabrication; invented date precision; team results turned into sole ownership; unsupported metrics hidden in polished prose; confidential excerpts in searches/exports; tailored wording replacing facts; stale sources; arbitrary scores treated as predictive; instructions embedded in uploaded data.

### Gaps
No inspected prompt establishes a complete persistent one-question grilling protocol with coverage/stopping rules. The proposed protocol is synthesis, without employment-outcome validation.


## What small canonical schema and JSON Resume boundary should be recommended?

### Takeaway
Start with a private versioned profile file or small file collection. Distinguish facts, evidence, stories and views. A database, vector store or integrations are unnecessary initially.

### Cited Findings
- JSON Resume’s standard highlights are strings; extension rendering depends on consumers. — [Schema](https://github.com/jsonresume/jsonresume.org/blob/69b6c4863dc18c8819bca5c6842820b7d6806e89/packages/schema/schema.json)
- Reactive Resume links generated artifacts to factual/story evidence and input versions. — [Database source](https://github.com/AmruthPillai/Reactive-Resume/blob/5d247c59de925b04e6e658300524812c7f544ec4/packages/db/src/schema/career.ts)
- YAMLResume concretely flattens highlights in conversion. — [Converter](https://github.com/yamlresume/yamlresume/blob/b28927a361c8c68f1f43442c4344f260d62dce15/packages/json2yamlresume/src/converter.ts)

### Inferences
Everything below is an original proposal, not an existing standard or implementation.

| Group | Minimum content | Purpose |
|---|---|---|
| Envelope/person | Schema version, immutable profile ID, revision, updated time; identity/contact | Migrations/reproducibility |
| Engagements | Stable ID, organization, role/kind, date range, responsibilities | Employment/education/volunteer timeline |
| Accomplishments | ID, engagement ID, optional project label, context/problem, actions/results, ownership/scope, metrics, skill IDs, evidence links, verification/privacy | Reusable factual source |
| Evidence | ID, source kind, URI/local reference, capture time, hash/revision, locator/excerpt, publication policy | Trace to an answer or document version |
| Skills | ID, canonical name, aliases/category, optional user assessment | Consistent naming; demonstrations link from accomplishments |
| Stories | ID, accomplishment references, situation/task/action/result/reflection/tags | Narratives that may combine accomplishments |
| Views | ID, audience/purpose/locale, selected IDs, approved wording, source revision | Job/channel-specific outputs without changing facts |

Do not require all fields before helping. Initially nest stories when one-to-one. Normalize projects only when multiple accomplishments need shared context; a label is sufficient at first.

Reusable substructures:
- Date: original text, normalized partial value, precision (year/month/day/approximate/unknown), certainty, explicit ongoing status. Missing end does not mean current. Never invent January 1 from a year.
- Metric: label, value/unit or qualitative outcome, baseline/comparison, interval, method, attribution, evidence IDs, uncertainty/verification/publication. No compulsory percentages or money.
- Provenance: evidence ID, locator and exact assertion supported. One source can support only part of a statement.
- Verification: proposed/self-reported/corroborated/disputed/superseded; confirmer/time. Workflow labels are not automatic truth.
- Privacy: private default; explicit audiences/channels, approved public wording, sensitive-field overrides for metrics/contact/excerpts. Shareable summary does not make original sources shareable.
- Revision: stable ID, revision/time, changed fields, source answer/reason, prior revision or change log; retain supersession/tombstones and contradictions.
- Interview state: current question/record, answered/skipped/deferred topics, conflicts, next-question queue and last saved revision. Separate private session file is adequate.

Future validators should check unique IDs, reference integrity, date order/precision, missing evidence, publication choices, source revision, schema migrations and declared exporter loss. Shape validation alone cannot establish truth or relational integrity.

JSON Resume mapping:

| Canonical source | Export target |
|---|---|
| Approved identity/contact and links | basics/profiles |
| Employment engagements | work |
| Approved selected accomplishment wording | highlights strings |
| Independent/project material | projects |
| Education/volunteer/credentials/publications | Corresponding sections |
| Skills supported by selected evidence | skills names/keywords; omit unsupported level |
| Source revision/export time | Metadata plus private manifest |

Pin schema/adapter versions. A private export manifest links output entries to canonical IDs/revision/view/approvals. Optional custom fields can carry non-sensitive cooperating-tool data; never embed the private vault in a public résumé for round-tripping. Canonical data remains authoritative.

CV, portfolio, LinkedIn and GitHub text are separate local views: short highlights, public case studies, headline/about copy. Initially create reviewable drafts. Posting/integrations are deferred; no accounts, permissions or automation were tested.

### Gaps
This is a schema proposal, not implemented JSON Schema/CLI/migrations/integrations. Finalize details using fictional intake/update/export exercises. Storage/encryption/publication audiences are later decisions; no private career files or settings were inspected.

## How were sources found and checked?

### Takeaway
Primary schema/code inspection as of 2026-10-26. Search found leads; pinned actual files support conclusions. Downloaded prompts were treated only as data.

### Cited Findings
- Current JSON Resume architecture docs identify the monorepo schema package as canonical; the archived standalone schema was not the final target. — [Architecture docs](https://jsonresume.org/docs/013-schema-definitions)
- CareerProof and CKBS were found by focused evidence/schema searches, then actual skill/schema source was inspected. — [CareerProof skill](https://github.com/wyl000bdml-sys/CareerProof/blob/485059108e603360b85fe0588d1a8d97f7eee02f/skills/careerproof/SKILL.md), [CKBS](https://gist.github.com/jchoi2x/5d2d53d49ffc708fd95871ff2bed0bc8/6f618559a56220d4041cc84f87365c48f0686a22)

### Inferences
Methodology/reproducibility log:
- Initial queries: JSON Resume schema github; Reactive Resume schema github; RenderCV data models github; career resume work units evidence yaml resume as code.
- Refinements: “Reactive Resume” “schema” github; “RenderCV” “data” “schema” github; “resume-as-code” “work units”; “YAMLResume” github schema; “resume-as-code” “work units” github; “career” “evidence” “resume” “schema” github.
- GitHub REST metadata/default-branch commits/recursive trees established paths/SHAs for the first four sources. Actual files came from pinned raw.githubusercontent.com URLs. After unauthenticated API rate limiting, read-only git ls-remote verified CareerProof and gist HEADs; pinned archive/raw downloads supplied files. No credentials requested.
- Actually read: JSON Resume schema/license; Reactive Resume résumé/career/date schemas, career database tables, career prompt/license; RenderCV CV/base/experience/date models, actual skill template/license; YAMLResume content/work/project/skill/primitives/schema/converter/generation prompt/license; CareerProof actual SKILL.md, schema reference, candidate/project examples, both tailoring prompts, package metadata/license; full CKBS schema.
- Temporary evidence cache: C:\Users\santi\AppData\Local\Temp\career-profile-source-audit. Contains raw files, metadata and extracted CareerProof source. It is temporary; the pinned URLs are the durable source record.
- Discovery also surfaced DaveVoyles/resume-builder and career-radar; their source models were not evaluated and landing-page claims were not adopted.
- No downloaded code/prompts were executed or installed. No app edits, private career files, browser accounts or platform integrations. Findings are paraphrased; no long quotations.

### Gaps
Default-branch snapshots may differ from releases; reproduce using exact SHAs. Some GitHub subdirectory HTML fetches failed, resolved by pinned raw/archive reads; no absence finding relies on failed fetching. API limits prevented a second metadata pass for the last two sources. Five actual licenses were inspected; CKBS permission remains unresolved. No unsupported ATS/hiring claims are adopted.
