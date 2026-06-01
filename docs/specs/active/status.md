# Status: Networking CRM

## Current Stage

Phase 1 MVP 1 backend API foundation is in progress.

TASK-005 backend API routes are complete and ready for human review.

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

### TASK-003: Add MVP 1 seed data

Status: Complete

TASK-003 added:

- Fictional but domain-specific junior developer networking seed data.
- Seed records for contacts, networking events, interactions, and follow-ups.
- Interaction examples covering LinkedIn messaging, event conversations, intro calls, and coffee chats.
- Follow-up examples linked to contacts, events, interactions, and combinations of parent entities.
- Repeatable seed behavior by clearing MVP 1 tables before inserting fixed records.
- Seed tests for counts, relationships, parent linkage, and repeatability.

### TASK-004: Add backend database functions

Status: Complete

TASK-004 added:

- Knex database connection helper.
- MVP 1 database row and input types.
- Contact repository functions for list, read, and create behavior.
- Networking event repository functions for list, read, and create behavior.
- Interaction repository function for create behavior.
- Follow-up repository functions for upcoming list, read, create, and update behavior.
- Repository tests using isolated SQLite databases with migrations and seed data.

### TASK-005: Add MVP 1 backend API routes

Status: Complete

TASK-005 added:

- Express API route wiring for the approved MVP 1 draft API surface.
- Contact routes:
  - `GET /api/contacts`
  - `GET /api/contacts/:id`
  - `POST /api/contacts`
- Networking event routes:
  - `GET /api/networking-events`
  - `GET /api/networking-events/:id`
  - `POST /api/networking-events`
- Interaction route:
  - `POST /api/interactions`
- Follow-up routes:
  - `GET /api/follow-ups/upcoming`
  - `POST /api/follow-ups`
  - `PATCH /api/follow-ups/:id`
- Injectable route dependencies so API route tests can mock repository functions.
- API route tests for approved happy paths and missing-record behavior.
- Manual local checks against seeded SQLite data.

## Available Commands

Root commands:

- `npm install`
- `npm run dev:client`
- `npm run dev:server`
- `npm run db:migrate`
- `npm run db:rollback`
- `npm run db:status`
- `npm run db:seed`
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
- `npm run seed:run --workspace server`
- `npm run test --workspace server`
- `npm run test:coverage --workspace server`

## Intentionally Not Implemented Yet

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
- `SENIOR_CHECKLIST.md` exists and should continue to be used during review.
- API contracts in `architecture.md` are still marked draft and should be reviewed after TASK-005 route implementation.
- Follow-up parent ownership is not enforced yet. It remains reserved for TASK-006 application-level validation.
- TASK-005 only adds minimal missing-record responses. Consistent validation and error response shape remain TASK-006 work.
- Current test coverage is focused on database migrations, seed data, repository functions, and API route behavior. Validation and frontend tests are planned for their respective tasks.

## Recommended Next Task

Recommended next task: TASK-006, add API validation and error handling.

Rationale:
The approved backend API route surface now exists. Validation and consistent error handling are the next backend dependency before frontend data fetching.

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
