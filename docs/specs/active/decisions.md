> Note to Codex: Update necessary human decisions here between each step and phase, review between phases to see if I, the human, has added anything too.

Decision 001:
MVP 1 is Networking CRM only.

Decision 002:
Job tracking deferred to MVP 2.

Decision 003:
Auth deferred to MVP 3.

Decision 004:
Tech stack = React + TypeScript + Express + SQLite + Knex.

Decision 005:
No contact_events table in MVP 1.

Decision 006:
Interactions act as the bridge between contacts and events.

Decision 007:
App-level validation preferred over DB enums for MVP.

Decision 008:
Follow-ups may have nullable foreign keys at DB level but must be associated with at least one entity through application logic.

Decision 009:
Package manager for TASK-001 and current scaffold = npm.

Decision 010:
Initial repository layout uses a root npm workspace with `client/` and `server/` workspaces.

Decision 011:
Initial server health route = `GET /health`, returning `{ "status": "ok" }`.

Decision 012:
Root script names for scaffold checks are `dev:client`, `dev:server`, `typecheck`, and `build`.

Decision 013:
`docs/specs/active/db-schema.md` is the primary database schema source of truth for TASK-002 migrations.
