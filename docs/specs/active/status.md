# Status: Networking CRM

## Current Stage

Phase 1 MVP 1 data foundation is in progress.

TASK-002 database migrations are complete and ready for human review.

## Completed Work

### TASK-001: Scaffold initial full-stack codebase

Status: Complete

TASK-001 scaffolded:

- Root npm workspace configuration.
- React + TypeScript + Vite client in `client/`.
- Node + Express + TypeScript server in `server/`.
- `GET /health` route returning `{ "status": "ok" }`.
- Knex configuration for SQLite in `server/knexfile.ts`.
- Conservative root `.gitignore`.
- README setup and development instructions.

### TASK-002: Add MVP 1 database migrations

Status: Complete

TASK-002 added:

- Knex migration for approved MVP 1 tables:
  - `contacts`
  - `networking_events`
  - `interactions`
  - `follow_ups`
- Foreign key relationships matching `architecture.md`.
- `RESTRICT` delete behavior for all foreign keys.
- Indexes for foreign key columns, `follow_ups.due_at`, and `follow_ups(status, due_at)`.
- Required timestamp columns without database defaults.
- Root migration scripts and README migration instructions.

### TASK-002A: Add database migration tests

Status: Complete

TASK-002A added:

- Vitest server test setup.
- V8 coverage support.
- In-memory SQLite migration tests for:
  - approved MVP 1 tables
  - column required/nullability behavior
  - no timestamp database defaults
  - foreign keys and `RESTRICT` delete behavior
  - approved indexes
  - rollback behavior

## Available Commands

Root commands:

- `npm install`
- `npm run dev:client`
- `npm run dev:server`
- `npm run db:migrate`
- `npm run db:rollback`
- `npm run db:status`
- `npm run test`
- `npm run test:coverage`
- `npm run typecheck`
- `npm run build`

Client workspace commands:

- `npm run dev --workspace client`
- `npm run build --workspace client`
- `npm run typecheck --workspace client`

Server workspace commands:

- `npm run dev --workspace server`
- `npm run build --workspace server`
- `npm run start --workspace server`
- `npm run typecheck --workspace server`
- `npm run migrate:latest --workspace server`
- `npm run migrate:rollback --workspace server`
- `npm run migrate:status --workspace server`
- `npm run test --workspace server`
- `npm run test:coverage --workspace server`

## Intentionally Not Implemented Yet

- Seed data.
- Database access functions.
- CRM API routes.
- API validation/error handling beyond the scaffold health route.
- Frontend data fetching.
- Frontend CRM screens or forms.
- Authentication or user accounts.
- Deployment configuration.
- Supabase, OAuth, external APIs, notifications, analytics, or styling libraries.
- Job application tracking.
- `contact_events` table.

## Known Risks and TODOs

- `npm install` previously reported npm audit vulnerabilities from dependency output. These should be reviewed separately and not auto-fixed without understanding dependency impact.
- The local SQLite database file is generated during migration checks and ignored by git.
- Runtime database connection modules do not exist yet.
- `SENIOR_CHECKLIST.md` exists and should continue to be used during review.
- API contracts in `architecture.md` are still marked draft and should be reviewed before route implementation.
- Follow-up parent ownership is not enforced at DB level by design. It must be enforced in application logic in a later task.
- Current test coverage is focused on database migrations only. Seed, repository, API, validation, and frontend tests are planned for their respective tasks.

## Recommended Next Task

Recommended next task: TASK-003, add MVP 1 seed data.

Rationale:
The approved schema now exists as migrations and has automated migration coverage. Seed data is the next dependency for manual database review and later backend data functions.

## TASK-002 Completion Checkpoint

Branch:

- `feat/database-migrations`

Current state:

- Migration implementation is complete.
- No seed files, database functions, API routes, frontend code, auth, deployment, integrations, or future MVP work have been created.

Schema source of truth:

- `docs/specs/active/db-schema.md`

Planning result:

- No conflicts were found between `db-schema.md`, `architecture.md`, and `decisions.md`.
- The schema has been translated into Knex migrations.

Tables to create:

- `contacts`
- `networking_events`
- `interactions`
- `follow_ups`

Do not create:

- `contact_events`
- Any job tracking, auth, user, external integration, notification, analytics, or future MVP tables.

Planned relationships:

- `interactions.contact_id` references `contacts.id`.
- `interactions.networking_event_id` references `networking_events.id`.
- `follow_ups.contact_id` references `contacts.id`.
- `follow_ups.networking_event_id` references `networking_events.id`.
- `follow_ups.interaction_id` references `interactions.id`.

Approved delete behavior:

- Use `RESTRICT` for all foreign keys.
- Rationale: MVP 1 has no approved delete workflows, relationship history should be preserved, `CASCADE` could remove useful history, and `SET NULL` could orphan follow-ups.

Approved indexes:

- Index all foreign key columns.
- Index `follow_ups.due_at`.
- Index `follow_ups(status, due_at)` for upcoming follow-up queries.

Approved timestamp behavior:

- Create required `created_at` and `updated_at` columns.
- Do not add DB defaults.
- Let application or seed logic populate timestamp values in later tasks.

TASK-002 verification performed:

- `npm run typecheck`
- `npm run db:migrate`
- SQLite schema inspection
- `npm run db:rollback`
- `npm run db:status`
- `npm run build`
