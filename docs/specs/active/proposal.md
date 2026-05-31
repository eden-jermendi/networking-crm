# Proposal: Networking CRM

## Problem

During a junior developer job search, networking activities quickly become difficult to track.

Contacts may come from LinkedIn, networking events, referrals, recruiters, or bootcamp connections. Conversations happen across messages, coffee chats, intro calls, and event interactions. Follow-up actions are often scattered across notes, calendars, and memory.

As the number of contacts grows, it becomes easy to lose context, forget follow-ups, miss opportunities, or duplicate effort.

## Who Benefits

Primary user:

- Junior developers conducting a job search and actively networking.

Initial target user:

- The project creator.

Future users may include:

- Students
- Career changers
- Bootcamp graduates
- Early-career professionals

## Proposed Solution

Build a lightweight Networking CRM focused on relationship management during a job search.

The application will allow users to:

- Track contacts
- Track networking events
- Record interactions
- Create follow-up actions
- View relationship history
- View upcoming actions

The system should prioritize clarity, simplicity, and maintaining context across networking activities.

## Technical Approach

MVP 1 will use:

- React
- TypeScript
- Node.js
- Express
- SQLite
- Knex

The initial application will be a single-user system without authentication.

Data will be organized around:

- Contacts
- Networking Events
- Interactions
- Follow-ups

Future phases may introduce job application tracking, authentication, and deployment improvements.

## Success Metrics

The project is successful when:

- Contacts can be added and viewed.
- Networking events can be added and viewed.
- Interactions can be recorded.
- Follow-ups can be created and completed.
- Relationship history is preserved.
- Upcoming actions are visible.
- The application is personally useful during an active job search.

## Non-Goals

MVP 1 will not include:

- Authentication
- User accounts
- OAuth
- Supabase
- Job application tracking
- Email integration
- Calendar integration
- LinkedIn scraping
- AI-generated summaries
- Notifications
- Analytics dashboards
- External APIs
- Complex UI styling

## Risks and Unknowns

- CRM workflows may change after real-world usage.
- Additional relationships may emerge once networking volume increases.
- Follow-up ownership rules may require refinement.
- The eventual job application tracking phase may introduce new data model requirements.

## Agentic SDLC Goal

This project is also an experiment in Agentic SDLC.

Success is not only measured by the finished application but by the ability to:

- Maintain clear specifications
- Work through bounded tasks
- Review agent output critically
- Prevent scope creep
- Capture architectural decisions
- Improve the development process through review and iteration
