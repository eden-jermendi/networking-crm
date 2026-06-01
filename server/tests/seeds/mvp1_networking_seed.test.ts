import knex, { type Knex } from "knex";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  down,
  up
} from "../../migrations/20260601000000_create_mvp1_tables.js";
import { seed } from "../../seeds/001_mvp1_networking.js";

describe("MVP 1 networking seed data", () => {
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
  });

  afterEach(async () => {
    await down(db);
    await db.destroy();
  });

  it("seeds domain-specific contacts, events, interactions, and follow-ups", async () => {
    await seed(db);

    await expectCounts(db, {
      contacts: 4,
      networking_events: 2,
      interactions: 4,
      follow_ups: 4
    });

    const contactNames = await db("contacts").pluck("name");
    expect(contactNames).toEqual([
      "Maya Chen",
      "Liam Patel",
      "Sofia Martinez",
      "Noah Williams"
    ]);

    const eventNames = await db("networking_events").pluck("name");
    expect(eventNames).toEqual([
      "Auckland React Meetup: Portfolio Review Night",
      "Junior Dev Coffee Chats: Hiring Manager AMA"
    ]);
  });

  it("connects interactions to contacts and events where appropriate", async () => {
    await seed(db);

    const eventConversation = await db("interactions")
      .select(
        "interactions.interaction_type",
        "contacts.name as contact_name",
        "networking_events.name as event_name"
      )
      .join("contacts", "contacts.id", "interactions.contact_id")
      .join(
        "networking_events",
        "networking_events.id",
        "interactions.networking_event_id"
      )
      .where("interactions.interaction_type", "event_conversation")
      .first();

    expect(eventConversation).toMatchObject({
      interaction_type: "event_conversation",
      contact_name: "Liam Patel",
      event_name: "Auckland React Meetup: Portfolio Review Night"
    });

    const scheduledIntroCall = await db("interactions")
      .where({ interaction_type: "intro_call" })
      .first();

    expect(scheduledIntroCall).toMatchObject({
      contact_id: 3,
      networking_event_id: null,
      completed_at: null
    });
  });

  it("seeds follow-ups that are always linked to at least one parent", async () => {
    await seed(db);

    const orphanedFollowUps = await db("follow_ups")
      .whereNull("contact_id")
      .whereNull("networking_event_id")
      .whereNull("interaction_id");

    expect(orphanedFollowUps).toEqual([]);

    const eventOnlyFollowUp = await db("follow_ups")
      .where({ title: "RSVP and prepare AMA question list" })
      .first();

    expect(eventOnlyFollowUp).toMatchObject({
      contact_id: null,
      networking_event_id: 2,
      interaction_id: null,
      status: "open"
    });
  });

  it("can be run repeatedly without duplicating rows", async () => {
    await seed(db);
    await seed(db);

    await expectCounts(db, {
      contacts: 4,
      networking_events: 2,
      interactions: 4,
      follow_ups: 4
    });

    const ids = await db("contacts").pluck("id");
    expect(ids).toEqual([1, 2, 3, 4]);
  });
});

async function expectCounts(
  db: Knex,
  expectedCounts: Record<string, number>
): Promise<void> {
  for (const [tableName, expectedCount] of Object.entries(expectedCounts)) {
    const result = await db(tableName).count<{ count: number }[]>(
      "id as count"
    );

    expect(result[0]?.count).toBe(expectedCount);
  }
}
