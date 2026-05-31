# Agent Operating Rules

## Project Philosophy

This project follows an Agentic SDLC workflow.

The human is responsible for:

- scope decisions
- architecture approval
- review
- merge approval

The agent is responsible for:

- completing bounded tasks
- staying within assigned scope
- reporting blockers and ambiguities

## Global Rules

- Work on one task at a time.
- Read proposal.md, tasks.md, decisions.md, and SENIOR_CHECKLIST.md before editing.
- State planned changes before making them.
- Stay within allowed files.
- Do not modify forbidden files.
- Do not continue into the next task automatically.
- If requirements are unclear, stop and ask.
- If blocked, report the blocker rather than guessing.
- Do not modify tests merely to force a pass.

## Scope Rules

- MVP-first.
- No future-phase implementation unless explicitly assigned.
- Do not introduce new dependencies without justification.
- Prefer simple solutions over abstractions.
- Avoid premature optimization.

## Completion Rules

After finishing a task:

Report:

- files changed
- tests run
- acceptance criteria status
- remaining risks
- recommendations for next task

Then stop.

---

# IMPORTANT

## Git/Repo Workflow Rules

### Branch Naming

Always work from a dedicated branch.

Branch names should follow:

```text
type/short-description
```

Examples:

```text
feat/contact-crud
feat/add-event-form
fix/interaction-validation
docs/update-readme
test/follow-up-api
```

Rules:

- Use lowercase only
- Use hyphens instead of spaces
- Keep names short and descriptive
- Never work directly on `main`

---

### Agent Branch Responsibilities

When assigned a task:

1. Create or switch to an appropriately named branch.
2. Perform only the scoped task.
3. Commit changes to that branch.
4. Push the branch to the remote repository.
5. Do not merge into `main`.
6. Do not delete branches.
7. Leave merge decisions to the human reviewer.

Agents should assume all work will be reviewed through a Pull Request before merging.

---

### Commit Formatting

Commits should follow:

```text
type: short description
```

Examples:

```text
feat: scaffold backend server
fix: correct knex config path
docs: update architecture notes
test: add health route tests
```

---

### Commit Rules

Commits must be atomic:

- One commit = one focused change
- Commit messages should clearly describe that change
- Avoid bundling unrelated work into the same commit
- Do not combine documentation, refactoring, and feature work into a single commit unless they are inseparable

Examples of good atomic commits:

```text
feat: add express server scaffold
docs: add task status update
test: add server startup test
```

Examples of bad commits:

```text
feat: build backend and update docs and fix lint issues
```

---

# IMPORTANT

### Pull Request Workflow

Agents should follow this workflow:

```text
Create branch
→ Complete scoped task
→ Commit changes
→ Push branch
→ Update status documents if required
→ Stop and await review
```

Never:

- Commit directly to `main`
- Merge into `main`
- Start the next task without review
- Implement work outside the approved task scope
