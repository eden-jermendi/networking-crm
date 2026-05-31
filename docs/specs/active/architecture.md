# Architecture: Networking CRM

## Purpose

This document describes the approved technical architecture for MVP 1 of the Networking CRM project.

Its purpose is to provide a shared understanding of:

- System structure
- Core entities and relationships
- API boundaries
- Technology choices
- Architectural constraints

This document focuses on how the system is designed. Project goals and business value are documented separately in proposal.md.

---

## System Context

Networking CRM is a single-user web application designed to help track professional networking activity during a job search.

Users can:

- Store networking contacts
- Record networking events
- Log interactions and conversations
- Track follow-up actions

The application is intended to centralize networking information and preserve relationship history over time.

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- Node.js
- Express
- TypeScript

### Database

- SQLite
- Knex

### Deployment

Deployment decisions are deferred until a later phase.

Authentication is not included in MVP 1.

---

## Architectural Principles

### MVP First

The system should prioritize simplicity and working functionality over extensibility.

### Single User

MVP 1 assumes a single-user workflow and does not include authentication or user ownership concepts.

### Explicit Scope Boundaries

Future-phase functionality should not be implemented early unless explicitly approved.

Examples of deferred functionality:

- Job application tracking
- Authentication
- OAuth
- Supabase
- External integrations
- Notifications
- AI features

### Relational Data Model

The system is built around a relational database model using SQLite and Knex.

Relationships should remain explicit and easy to reason about.

---

## Core Entities

### contacts

Represents people known through networking activities.

Examples:

- LinkedIn connections
- Recruiters
- Alumni
- Event contacts
- Industry professionals

### networking_events

Represents networking opportunities or events.

Examples:

- Meetups
- Conferences
- Community events
- Career fairs
- Industry talks

### interactions

Represents communication or engagement with a contact.

Examples:

- LinkedIn messages
- Intro calls
- Coffee chats
- Event conversations
- Emails

Interactions may optionally be associated with a networking event.

### follow_ups

Represents future actions that should be completed.

Examples:

- Send a message
- Arrange a call
- Check in after an event
- Continue a conversation

A follow-up may be linked to a contact, event, interaction, or a combination of those entities.

---

## Entity Relationships

### Contact → Interaction

One contact can have many interactions.

Each interaction belongs to a single contact.

### Networking Event → Interaction

One networking event can have many interactions.

An interaction may optionally belong to a networking event.

### Contact → Follow-up

One contact can have many follow-ups.

### Networking Event → Follow-up

One networking event can have many follow-ups.

### Interaction → Follow-up

One interaction can have many follow-ups.

### Relationship Notes

A dedicated contact_events join table is intentionally excluded from MVP 1.

Interactions act as the connection point between contacts and networking events when required.

---

## Database Tables

Approved MVP 1 tables:

- contacts
- networking_events
- interactions
- follow_ups

Additional tables require explicit architectural review before implementation.

---

## API Surface (Draft)

### Contacts

- GET /api/contacts
- GET /api/contacts/:id
- POST /api/contacts

### Networking Events

- GET /api/networking-events
- GET /api/networking-events/:id
- POST /api/networking-events

### Interactions

- POST /api/interactions

### Follow-ups

- GET /api/follow-ups/upcoming
- POST /api/follow-ups
- PATCH /api/follow-ups/:id

API contracts remain subject to review before implementation.

---

## Constraints

### Data Validation

MVP 1 will primarily use application-level validation.

Database-level enum constraints are deferred.

### Follow-up Ownership

A follow-up should be associated with at least one parent entity:

- contact
- networking event
- interaction

This rule will initially be enforced in application logic.

### Scope Protection

New entities, integrations, or infrastructure should not be added without updating:

- proposal.md
- architecture.md
- decisions.md

and receiving explicit approval.
