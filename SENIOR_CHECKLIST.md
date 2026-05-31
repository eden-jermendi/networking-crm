# Senior Review Checklist

Use this checklist when reviewing agent work in this repository.

## Scope Compliance

- Work matches the assigned task and does not continue into the next task.
- Changed files match the task's allowed files/folders.
- Forbidden files or areas were not modified.
- No implementation decisions were made silently when requirements were unclear.

## MVP 1 Boundaries

- Work remains within Networking CRM MVP 1.
- No job tracking, auth, user accounts, OAuth, Supabase, deployment, external APIs, notifications, analytics, AI features, or complex styling were added.
- No new entities or tables were added without architecture and decision updates.
- No `contact_events` table was introduced.

## Technical Fit

- Solution follows existing React, TypeScript, Express, SQLite, and Knex scaffold.
- Implementation is simple and task-focused.
- No premature abstraction or broad refactor was introduced.
- New dependencies are justified and approved before use.

## Tests and Checks

- Required task checks were run and reported.
- Failures, skipped checks, and environment limitations were disclosed.
- Tests were not modified merely to force a pass.
- Manual checks are documented when automated coverage does not exist yet.

## Documentation and Status

- `docs/specs/active/status.md` was updated when task status changed.
- `docs/specs/active/tasks.md` reflects completed and next work when required.
- `docs/specs/active/decisions.md` records durable human-approved decisions.
- Remaining risks and recommended next steps are stated clearly.

## Review Outcome

- Acceptance criteria are explicitly marked pass/fail.
- Remaining ambiguities are identified before the next task starts.
- Human review and merge approval remain separate from agent implementation.
