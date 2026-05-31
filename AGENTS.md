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
