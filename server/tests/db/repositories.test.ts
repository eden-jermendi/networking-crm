import knex, { type Knex } from "knex";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  down,
  up
} from "../../migrations/20260601000000_create_mvp1_tables.js";
import {
  createContactRepository,
  createFollowUpRepository,
  createInteractionRepository,
  createNetworkingEventRepository
} from "../../src/db/repositories/index.js";
import { seed } from "../../seeds/001_mvp1_networking.js";

describe("database repositories", () => {
  let db: Knex;

  beforeEach(async () => {
    db = knex({
      client: "sqlite3",
      connection: {
        filename: ":memory:"
      },
      useNullAsDefault: true
    });

    await db.raw("PRAGMA foreign_keys = ON");
    await up(db);
    await seed(db);
  });

  afterEach(async () => {
    await down(db);
    await db.destroy();
  });

  it("lists, reads, and creates contacts", async () => {
    const contacts = createContactRepository(db);

    const seededContacts = await contacts.listContacts();
    expect(seededContacts.map((contact) => contact.name)).toEqual([
      "Liam Patel",
      "Maya Chen",
      "Noah Williams",
      "Sofia Martinez"
    ]);

    await expect(contacts.getContactById(1)).resolves.toMatchObject({
      name: "Maya Chen",
      contact_source: "linkedin"
    });

    const created = await contacts.createContact({
      name: "Priya Singh",
      role_title: "Backend Engineer",
      company: "Harbour Labs",
      linkedin_url: "https://www.linkedin.com/in/priya-singh-example",
      contact_source: "referral",
      status: "new",
      notes: "Referral from a meetup attendee for a Node-focused coffee chat.",
      last_contacted_at: null
    });

    expect(created).toMatchObject({
      id: 5,
      name: "Priya Singh",
      status: "new"
    });
    expect(created.created_at).toBeTruthy();
    expect(created.updated_at).toBeTruthy();
  });

  it("lists, reads, and creates networking events", async () => {
    const events = createNetworkingEventRepository(db);

    const seededEvents = await events.listNetworkingEvents();
    expect(seededEvents.map((event) => event.name)).toEqual([
      "Auckland React Meetup: Portfolio Review Night",
      "Junior Dev Coffee Chats: Hiring Manager AMA"
    ]);

    await expect(events.getNetworkingEventById(2)).resolves.toMatchObject({
      name: "Junior Dev Coffee Chats: Hiring Manager AMA",
      event_type: "community_event"
    });

    const created = await events.createNetworkingEvent({
      name: "Women in Web: Junior Portfolio Clinic",
      event_type: "meetup",
      starts_at: "2026-06-12T06:00:00.000Z",
      ends_at: "2026-06-12T08:00:00.000Z",
      location: "Auckland CBD",
      event_url: "https://events.example.com/women-in-web-portfolio-clinic",
      ticket_url: null,
      notes: "Bring questions about presenting full-stack portfolio projects."
    });

    expect(created).toMatchObject({
      id: 3,
      name: "Women in Web: Junior Portfolio Clinic"
    });
  });

  it("creates interactions linked to contacts and optionally events", async () => {
    const interactions = createInteractionRepository(db);

    const created = await interactions.createInteraction({
      contact_id: 1,
      networking_event_id: null,
      interaction_type: "coffee_chat",
      scheduled_at: "2026-06-10T00:00:00.000Z",
      completed_at: null,
      notes: "Scheduled a portfolio feedback coffee chat with Maya.",
      next_step: "Send calendar invite and portfolio link."
    });

    expect(created).toMatchObject({
      id: 5,
      contact_id: 1,
      networking_event_id: null,
      interaction_type: "coffee_chat"
    });
  });

  it("lists upcoming follow-ups, creates follow-ups, and represents completion", async () => {
    const followUps = createFollowUpRepository(db);

    const seededUpcoming = await followUps.listUpcomingFollowUps();
    expect(seededUpcoming.map((followUp) => followUp.title)).toEqual([
      "Prepare recruiter intro-call talking points",
      "Email Liam CV and CRM project summary",
      "Send Maya updated portfolio README",
      "RSVP and prepare AMA question list"
    ]);

    const created = await followUps.createFollowUp({
      contact_id: 4,
      networking_event_id: 2,
      interaction_id: 4,
      title: "Send Noah post-AMA thank-you note",
      due_at: "2026-06-08T22:00:00.000Z",
      status: "open",
      notes: "Mention the bootcamp-to-production advice he shared."
    });

    expect(created).toMatchObject({
      id: 5,
      contact_id: 4,
      networking_event_id: 2,
      interaction_id: 4,
      status: "open"
    });

    const completed = await followUps.updateFollowUp(created.id, {
      status: "completed"
    });

    expect(completed).toMatchObject({
      id: 5,
      status: "completed"
    });
    expect(completed?.updated_at).toBeTruthy();

    const upcomingAfterCompletion = await followUps.listUpcomingFollowUps();
    expect(upcomingAfterCompletion.map((followUp) => followUp.id)).not.toContain(
      created.id
    );
  });
});
