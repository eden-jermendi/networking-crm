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

Decision 014:
TASK-002 foreign key delete behavior = `RESTRICT` for all MVP 1 foreign keys.

Decision 015:
TASK-002 indexes include all foreign key columns, `follow_ups.due_at`, and `follow_ups(status, due_at)`.

Decision 016:
TASK-002 timestamp columns `created_at` and `updated_at` are required but do not use database defaults. Later application or seed logic must provide timestamp values.

Decision 017:
MVP 1 migrations are run through npm scripts: `db:migrate`, `db:rollback`, and `db:status`.

Decision 018:
Server-side tests use Vitest with V8 coverage for MVP 1 backend work.

Decision 019:
Database migration tests use isolated in-memory SQLite databases instead of the local development SQLite file.

Decision 020:
Mocking and HTTP interception should be used where they fit the layer under test: database-function tests may mock narrow boundaries when useful, API tests may use mocks around database functions, and frontend/API-client tests may use request interception. Direct migration tests should not mock the schema.
