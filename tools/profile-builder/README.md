# Career profile builder

An interview skill plus a dependency-free Node CLI. It keeps career facts, stories, evidence and skill links in one private store, with confirmation, correction history and resumable questions. CV/portfolio generation and account integrations are future work.

Requires Node 20+. From this repository:

```sh
npm run profile -- interview
```

The interview creates or resumes `~/.career-profile/profile.json`. Use `/pause` to stop, `/skip` to defer a question, `/unknown` or `/withheld` for those answer states. At the story readback, choose `revise` to correct a part before confirming it. Career facts remain private after confirmation. The data is local plain text; corrections keep old values in history.

```sh
npm run profile -- status
npm run profile -- validate
npm run test:profile
```

Override the store with `CAREER_PROFILE_HOME` or `--home /path/to/private/store`. All commands must use the same location. `help` documents the JSON-based commands for agent-led interviews and rich structured edits; writes require the revision last read.

For a conversational interview, invoke `$career-profile-builder` and ask to start or resume your profile. The skill source is [SKILL.md](../../.agents/skills/career-profile-builder/SKILL.md); its scripts own persistence. A global skill installation can point to that same directory, avoiding a second copy.

This version starts empty. Existing CV/portfolio files have not been imported. It makes no network calls, needs no API key, and does not publish or change your existing CV/portfolio.
