# Decision: MVP 1 Data Model

## Decision

MVP 1 will use four core tables:

- contacts
- networking_events
- interactions
- follow_ups

The `contact_events` join table will not be included in MVP 1.

## Rationale

Interactions already connect contacts to networking events when needed. This supports the MVP use case without adding an extra relationship table too early.

## Deferred

A contact-event join table may be reconsidered later if the app needs to track event attendance separately from actual interactions.

## Approved MVP 1 Tables

- contacts
- networking_events
- interactions
- follow_ups
