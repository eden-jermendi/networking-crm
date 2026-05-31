# Status: Networking CRM

## Current Stage

Phase 0 project setup is complete.

TASK-002 is paused after schema planning and before migration implementation.

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

## Available Commands

Root commands:

- `npm install`
- `npm run dev:client`
- `npm run dev:server`
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

## Intentionally Not Implemented Yet

- Database migrations.
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
- The SQLite database file path is configured, but no database directory, migrations, or runtime database connection module exists yet.
- `SENIOR_CHECKLIST.md` was empty before this planning pass and now needs human review.
- API contracts in `architecture.md` are still marked draft and should be reviewed before route implementation.

## Recommended Next Task

Recommended next task: resume TASK-002, add MVP 1 database migrations.

Rationale:
The scaffold is complete and the next dependency for all CRM behavior is the approved relational schema.

## TASK-002 Resume Checkpoint

Branch:

- `feat/database-migrations`

Current state:

- Latest `origin/main` was fetched and pulled before TASK-002 planning.
- Branch `feat/database-migrations` was created from latest `main`.
- Required docs were read.
- Existing Knex/SQLite config was inspected in `server/knexfile.ts`.
- Migration implementation has not started.
- No migrations, seed files, database functions, API routes, frontend code, auth, deployment, integrations, or future MVP work have been created.

Schema source of truth:

- `docs/specs/active/db-schema.md`

Planning result:

- No conflicts were found between `db-schema.md`, `architecture.md`, and `decisions.md`.
- The schema is ready to translate into Knex migrations after human approval of the open implementation details below.

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

Recommended delete behavior awaiting approval:

- Use `RESTRICT` for all foreign keys.
- Rationale: MVP 1 has no approved delete workflows, relationship history should be preserved, `CASCADE` could remove useful history, and `SET NULL` could orphan follow-ups.

Recommended indexes awaiting approval:

- Index all foreign key columns.
- Index `follow_ups.due_at`.
- Consider index `follow_ups(status, due_at)` for upcoming follow-up queries.

Recommended timestamp behavior awaiting approval:

- Create required `created_at` and `updated_at` columns.
- Do not add DB defaults unless explicitly approved.
- Let application or seed logic populate timestamp values in later tasks.

Implementation reminder:

- TASK-002 may update only migration files/configuration as needed and README setup notes if migration commands need documentation.
- TASK-002 must not create seeds, database functions, CRM API routes, frontend CRM screens, validation logic, auth, deployment configuration, external APIs, or future MVP functionality.
