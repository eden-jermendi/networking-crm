# Tasks: Networking CRM

## Phase 0: Project Setup

### TASK-001: Scaffold initial full-stack codebase

Status: Complete

Role: Implementation Agent

Goal:
Create the initial full-stack project structure using TypeScript, React, Node/Express, SQLite, and Knex.

Completed scope:

- Root npm workspace setup.
- React + TypeScript + Vite client scaffold.
- Node + Express + TypeScript server scaffold.
- `GET /health` route returning `{ "status": "ok" }`.
- Knex/SQLite configuration prepared without migrations.
- Setup and development commands documented in README.md.
- Conservative root `.gitignore`.

Acceptance criteria:

- [x] Client app can run.
- [x] Server app can run.
- [x] Server exposes a basic health route.
- [x] TypeScript is configured.
- [x] Knex/SQLite is prepared but no migrations are created.
- [x] Setup instructions are documented.

Stopping point:
Stopped after scaffold only.

---

## Phase 1: MVP 1 Data Foundation

### Current Testing Plan

Goal:
Add backend tests incrementally before frontend work so data and API behavior are verified as each layer is introduced.

Testing approach:

- Use Vitest for server-side tests.
- Use V8 coverage through `npm run test:coverage`.
- Test database migrations against isolated in-memory SQLite.
- Prefer small focused tests at each layer.
- Use mocks only where they protect task boundaries.
- Use HTTP interception/mocking for frontend or API-client tests when network calls exist.
- Do not create broad end-to-end tests until the UI exists.

### TASK-002: Add MVP 1 database migrations

Status: Complete

Goal:
Create Knex migrations for the approved MVP 1 tables and relationships.

Planning checkpoint:

- Required docs were read.
- Existing Knex/SQLite configuration was inspected.
- `docs/specs/active/db-schema.md` was treated as the primary schema source of truth.
- No conflicts were found between `db-schema.md`, `architecture.md`, and `decisions.md`.
- No files were modified during the migration planning pass.
- No migrations, seeds, database functions, API routes, or frontend code were created.

Approved migration interpretation:

- Create only `contacts`, `networking_events`, `interactions`, and `follow_ups`.
- Do not create `contact_events`.
- Use nullable follow-up parent foreign keys at DB level.
- Do not add DB enum/check constraints for statuses or types.
- Enforce "follow-up must have at least one parent entity" later in application logic, not in TASK-002 migrations.

Previously approved before implementation:

- Foreign key delete behavior: `RESTRICT` for all foreign keys.
- Indexes: all foreign keys, `follow_ups.due_at`, and `follow_ups(status, due_at)`.
- Timestamp handling: required `created_at` and `updated_at` columns with values supplied by application/seed logic, not DB defaults.

Approved implementation decisions:

- Foreign key delete behavior uses `RESTRICT` for all MVP 1 foreign keys.
- Indexes include all foreign key columns, `follow_ups.due_at`, and `follow_ups(status, due_at)`.
- Required `created_at` and `updated_at` columns do not use database defaults.

Completed scope:

- Added a Knex migration for `contacts`, `networking_events`, `interactions`, and `follow_ups`.
- Configured Knex to use TypeScript migrations from `server/migrations`.
- Added migration npm scripts.
- Added a tracked `server/data/.gitkeep` so the local SQLite directory exists.
- Documented migration commands in README.md.

Allowed changes:

- `server/` migration files and migration configuration only as needed.
- README setup notes only if migration commands need documentation.

Forbidden changes:

- Seed data.
- Database access/repository functions.
- CRM API routes.
- Frontend CRM screens.
- New entities or tables beyond `contacts`, `networking_events`, `interactions`, and `follow_ups`.
- `contact_events` table.
- Auth, deployment, Supabase, OAuth, external APIs, notifications, analytics, or future MVP work.

Acceptance criteria:

- [x] Migrations create only the approved MVP 1 tables.
- [x] Relationships match `architecture.md`.
- [x] Follow-up parent foreign keys may be nullable at DB level.
- [x] No DB enum constraints are added.
- [x] Migrations can run from a documented npm command.
- [x] Migrations can be rolled back cleanly.

Required tests/checks:

- Run install if dependencies are missing.
- Run migration up against a local SQLite database.
- Inspect resulting schema.
- Run migration rollback.
- Run `npm run typecheck`.

Human review checkpoint:
Human reviews the schema before seed data, database functions, or API routes begin.

### TASK-002A: Add database migration tests

Status: Complete

Goal:
Add focused automated tests for the approved MVP 1 database migration.

Allowed changes:

- Server test configuration.
- Server migration tests.
- Test-related npm scripts and coverage configuration.
- Task/status/decision documentation updates.

Forbidden changes:

- Seed data.
- Database access/repository functions.
- CRM API routes.
- Frontend CRM screens.
- Schema changes not required to make tests possible.
- Auth, deployment, Supabase, OAuth, external APIs, notifications, analytics, or future MVP work.

Acceptance criteria:

- [x] Migration tests verify approved tables are created.
- [x] Migration tests verify required/nullability behavior for schema columns.
- [x] Migration tests verify no database defaults for required timestamp columns.
- [x] Migration tests verify approved foreign keys and `RESTRICT` delete behavior.
- [x] Migration tests verify approved indexes.
- [x] Migration tests verify rollback drops MVP 1 tables.
- [x] Test and coverage scripts are available.

Required tests/checks:

- Run `npm run test`.
- Run `npm run test:coverage`.
- Run `npm run typecheck`.
- Run `npm run build`.

Human review checkpoint:
Human reviews the test setup before seed data begins.

### TASK-003: Add MVP 1 seed data

Status: Complete

Goal:
Add minimal local seed data for the approved MVP 1 entities to support manual development and review.

Completed scope:

- Added local seed data for contacts, networking events, interactions, and follow-ups.
- Used fictional but junior-developer-job-search-specific sample data.
- Added seed command wiring through npm scripts.
- Added seed tests covering counts, relationships, follow-up parent linkage, and repeatability.
- Documented seed command in README.md.

Allowed changes:

- `server/` seed files.
- README setup notes only if seed commands need documentation.

Forbidden changes:

- Schema changes.
- Database access/repository functions.
- CRM API routes.
- Frontend CRM screens.
- Large or realistic personal datasets.
- External APIs or imported third-party data.

Acceptance criteria:

- [x] Seed data covers contacts, networking events, interactions, and follow-ups.
- [x] Seed data demonstrates an interaction linked to a contact and optionally an event.
- [x] Seed data demonstrates a follow-up linked to at least one parent entity.
- [x] Seeds are safe to run repeatedly in a local development database.

Required tests/checks:

- Run migrations.
- Run seeds.
- Inspect seeded rows.
- Add or update seed tests to verify seed counts, relationships, and repeatability.
- Run `npm run test`.
- Run `npm run test:coverage`.
- Run `npm run typecheck`.

Human review checkpoint:
Human reviews seed shape and sample data before database functions begin.

### TASK-004: Add backend database functions

Status: Complete

Goal:
Create backend data access functions for MVP 1 entities without exposing HTTP CRM routes yet.

Completed scope:

- Added a Knex database connection helper.
- Added TypeScript row and input types for MVP 1 tables.
- Added repository factories for contacts, networking events, interactions, and follow-ups.
- Added repository tests using isolated SQLite databases with migrations and seed data.
- Kept Express routes and frontend code unchanged.

Allowed changes:

- `server/src/` database connection code.
- `server/src/` repository/query modules.
- Minimal TypeScript types for database rows and inputs.

Forbidden changes:

- Express CRM API routes.
- Frontend changes.
- Schema changes unless a human explicitly approves a migration correction.
- Validation libraries or new dependencies without approval.
- Auth, user ownership, or future-phase data models.

Acceptance criteria:

- [x] Database connection uses the existing Knex/SQLite setup.
- [x] Functions support MVP 1 read/create/update needs implied by the draft API surface.
- [x] Follow-up completion can be represented.
- [x] Repository functions stay simple and entity-focused.
- [x] No HTTP route behavior is introduced.

Required tests/checks:

- Run migrations and seeds.
- Add repository/database-function tests for each created data access function.
- Use isolated SQLite test databases for behavior that depends on SQL.
- Mock only narrow boundaries that are outside the current task scope.
- Run `npm run test`.
- Run `npm run test:coverage`.
- Run `npm run typecheck`.
- Add and run focused backend checks if a test harness exists or is introduced with approval.

Human review checkpoint:
Human reviews database function boundaries before HTTP API routes begin.

### TASK-005: Add MVP 1 backend API routes

Status: Complete

Goal:
Expose the approved draft MVP 1 API routes using the backend database functions.

Completed scope:

- Added injectable Express API route wiring for approved MVP 1 routes.
- Added production route dependencies backed by existing Knex repository factories.
- Preserved `GET /health` response behavior.
- Added API route tests for happy paths and missing-record behavior using mocked repository functions.
- Manually checked approved routes against seeded local SQLite data.

Allowed changes:

- Express route modules under `server/src/`.
- Server app wiring for approved CRM routes.
- Minimal request/response types where useful.

Forbidden changes:

- Frontend CRM screens.
- Schema changes unless a human explicitly approves a migration correction.
- Auth or user scoping.
- External APIs.
- Routes outside the approved MVP 1 API surface without human approval.

Acceptance criteria:

- [x] Approved contact, networking event, interaction, and follow-up endpoints exist.
- [x] `GET /health` remains unchanged.
- [x] Routes use database functions rather than inline SQL.
- [x] Upcoming follow-ups endpoint returns incomplete follow-ups ordered by due date.
- [x] Follow-up completion is supported.

Required tests/checks:

- Run migrations and seeds.
- Add API route tests for approved happy paths and missing-record behavior.
- Mock database functions where route tests should stay focused on HTTP behavior.
- Avoid testing frontend behavior in API route tests.
- Run `npm run test`.
- Run `npm run test:coverage`.
- Run `npm run typecheck`.
- Start server dev script.
- Manually check each route with seeded data.

Human review checkpoint:
Human reviews API behavior before validation/error handling is expanded.

### TASK-006: Add API validation and error handling

Status: Complete

Goal:
Add simple application-level validation and consistent error responses for MVP 1 API routes.

Completed scope:

- Added dependency-free API validation helpers.
- Added consistent JSON error responses for validation errors, invalid IDs, missing records, and unexpected server errors.
- Added Express error handling middleware that avoids stack traces in normal API responses.
- Enforced required fields for MVP 1 create/update routes.
- Enforced follow-up parent ownership during create and update.
- Added API route tests for valid requests, invalid IDs, missing records, validation errors, no-mutation invalid requests, and generic internal errors.
- Manually checked valid and invalid API requests against the local dev server.

Allowed changes:

- Server-side validation helpers.
- Error handling middleware.
- Route-level validation updates.
- Minimal backend tests/checks if approved or already available.

Forbidden changes:

- Database enum constraints.
- New validation dependencies without approval.
- Frontend CRM screens.
- Auth, permissions, or user ownership.
- New routes or entities.

Acceptance criteria:

- [x] Required fields are validated for create/update routes.
- [x] Follow-ups must be associated with at least one parent entity in application logic.
- [x] Invalid IDs and missing records return consistent errors.
- [x] Server does not expose stack traces in normal API responses.

Required tests/checks:

- Add validation/error tests for required fields, invalid IDs, missing records, and follow-up parent ownership.
- Confirm invalid requests do not mutate the database.
- Run `npm run test`.
- Run `npm run test:coverage`.
- Run `npm run typecheck`.
- Manually check valid and invalid API requests.
- Confirm existing happy paths still work.

Human review checkpoint:
Human reviews validation behavior before frontend data fetching begins.

### TASK-007: Add frontend data fetching setup

Goal:
Create minimal frontend API utilities for calling the MVP 1 backend routes without building CRM screens yet.

Allowed changes:

- `client/src/` API client/helper modules.
- Frontend TypeScript types matching approved API responses.
- README notes only if local client/server workflow changes.

Forbidden changes:

- CRM screens and forms.
- Styling libraries.
- State management libraries unless explicitly approved.
- Backend schema or API changes.
- Auth or external APIs.

Acceptance criteria:

- Frontend has simple typed helpers for approved MVP 1 API endpoints.
- Helpers handle JSON responses and basic error cases.
- No user-facing CRM workflow is implemented yet.

Required tests/checks:

- Add tests for frontend API helper success and error handling.
- Use request interception/mocking for HTTP behavior.
- Do not require CRM screens for these tests.
- Run `npm run test`.
- Run `npm run test:coverage`.
- Run `npm run typecheck`.
- Run `npm run build`.

Human review checkpoint:
Human reviews frontend API boundary before screens and forms begin.

### TASK-008: Add minimal MVP 1 frontend screens and forms

Goal:
Build minimal usable frontend screens and forms for the approved MVP 1 workflows.

Allowed changes:

- `client/src/` React components, screens, forms, and simple CSS.
- Frontend calls to approved API helper functions.

Forbidden changes:

- Styling libraries.
- Auth UI.
- Analytics dashboards.
- Job tracking UI.
- Notifications.
- External integrations.
- Backend schema changes unless separately approved.

Acceptance criteria:

- User can view and add contacts.
- User can view and add networking events.
- User can record interactions.
- User can create and complete follow-ups.
- User can see relationship history.
- User can see upcoming actions.
- UI remains simple and MVP-focused.

Required tests/checks:

- Add focused component/workflow tests for forms, loading states, errors, and complete follow-up behavior.
- Mock API helpers or intercept HTTP calls rather than requiring a real backend for component tests.
- Preserve existing backend tests.
- Run `npm run test`.
- Run `npm run test:coverage`.
- Run `npm run typecheck`.
- Run `npm run build`.
- Start client and server locally.
- Manually verify each MVP 1 workflow.

Human review checkpoint:
Human reviews MVP 1 usability before review/validation pass.

### TASK-009: MVP 1 review and validation pass

Goal:
Review the completed MVP 1 implementation against proposal, architecture, decisions, and task acceptance criteria.

Allowed changes:

- Bug fixes required to satisfy existing MVP 1 acceptance criteria.
- Documentation/status updates.
- Small cleanup inside already-approved MVP 1 files.

Forbidden changes:

- New features.
- New entities.
- Future MVP work.
- Auth, deployment, Supabase, OAuth, external APIs, notifications, analytics, or styling libraries.
- Broad refactors not required for MVP 1 correctness.

Acceptance criteria:

- MVP 1 scope is implemented and manually verified.
- Non-goals remain absent.
- Documentation reflects actual behavior.
- Known risks and follow-up recommendations are recorded.

Required tests/checks:

- Run `npm install` if needed.
- Run `npm run test`.
- Run `npm run test:coverage`.
- Run `npm run typecheck`.
- Run `npm run build`.
- Run migrations and seeds.
- Start client and server.
- Manually verify MVP 1 workflows end to end.

Human review checkpoint:
Human reviews final MVP 1 readiness and decides whether to merge, request fixes, or define the next phase.
