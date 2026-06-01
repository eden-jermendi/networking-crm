# Status: Networking CRM

## Current Stage

Phase 1 MVP 1 frontend API foundation is in progress.

TASK-007 frontend data fetching setup is complete and ready for human review.

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

### TASK-006: Add API validation and error handling

Status: Complete

TASK-006 added:

- Dependency-free API validation helpers for MVP 1 route bodies and IDs.
- Consistent JSON error responses using:
  - `bad_request`
  - `validation_error`
  - `not_found`
  - `internal_server_error`
- Express error handling middleware that hides stack traces in normal API responses.
- Required-field validation for contact, networking event, interaction, and follow-up create requests.
- Follow-up update validation for provided fields.
- Follow-up parent ownership validation on create and update.
- API route tests for invalid IDs, missing records, required fields, follow-up parent ownership, no-mutation invalid requests, and generic internal errors.
- Manual valid and invalid API checks through the local dev server.

### TASK-007: Add frontend data fetching setup

Status: Complete

TASK-007 added:

- Frontend TypeScript API types for contacts, networking events, interactions, follow-ups, request inputs, and structured API errors.
- Fetch-based frontend helpers for the approved MVP 1 API surface.
- `ApiError` handling for backend JSON errors and fallback request failures.
- Client Vitest configuration and mocked-fetch tests for success and error behavior.
- Root test scripts updated so `npm run test` and `npm run test:coverage` run both client and server test suites.

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
- API contracts in `architecture.md` are still marked draft and should be reviewed after TASK-006 validation behavior.
- Current validation is intentionally simple and does not introduce DB enum constraints or validation dependencies.
- Frontend API helpers default to the local server base URL and can be overridden with `VITE_API_BASE_URL`.
- Current test coverage includes database migrations, seed data, repository functions, API routes, validation/error handling, and frontend API helpers. Frontend screen tests are planned for TASK-008.

## Recommended Next Task

Recommended next task: TASK-008, add minimal MVP 1 frontend screens and forms.

Rationale:
The backend API route surface and frontend API helper boundary now exist with test coverage. Minimal frontend screens and forms are the next step for usable MVP 1 workflows.

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
