import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("contacts", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("role_title").nullable();
    table.string("company").nullable();
    table.string("linkedin_url").nullable();
    table.string("contact_source").notNullable();
    table.string("status").notNullable();
    table.text("notes").nullable();
    table.timestamp("last_contacted_at").nullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("updated_at").notNullable();
  });

  await knex.schema.createTable("networking_events", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("event_type").notNullable();
    table.timestamp("starts_at").notNullable();
    table.timestamp("ends_at").nullable();
    table.string("location").nullable();
    table.string("event_url").nullable();
    table.string("ticket_url").nullable();
    table.text("notes").nullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("updated_at").notNullable();
  });

  await knex.schema.createTable("interactions", (table) => {
    table.increments("id").primary();
    table.integer("contact_id").unsigned().notNullable();
    table.integer("networking_event_id").unsigned().nullable();
    table.string("interaction_type").notNullable();
    table.timestamp("scheduled_at").nullable();
    table.timestamp("completed_at").nullable();
    table.text("notes").nullable();
    table.text("next_step").nullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("updated_at").notNullable();

    table
      .foreign("contact_id")
      .references("id")
      .inTable("contacts")
      .onDelete("RESTRICT");
    table
      .foreign("networking_event_id")
      .references("id")
      .inTable("networking_events")
      .onDelete("RESTRICT");

    table.index(["contact_id"], "interactions_contact_id_idx");
    table.index(
      ["networking_event_id"],
      "interactions_networking_event_id_idx"
    );
  });

  await knex.schema.createTable("follow_ups", (table) => {
    table.increments("id").primary();
    table.integer("contact_id").unsigned().nullable();
    table.integer("networking_event_id").unsigned().nullable();
    table.integer("interaction_id").unsigned().nullable();
    table.string("title").notNullable();
    table.timestamp("due_at").notNullable();
    table.string("status").notNullable();
    table.text("notes").nullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("updated_at").notNullable();

    table
      .foreign("contact_id")
      .references("id")
      .inTable("contacts")
      .onDelete("RESTRICT");
    table
      .foreign("networking_event_id")
      .references("id")
      .inTable("networking_events")
      .onDelete("RESTRICT");
    table
      .foreign("interaction_id")
      .references("id")
      .inTable("interactions")
      .onDelete("RESTRICT");

    table.index(["contact_id"], "follow_ups_contact_id_idx");
    table.index(["networking_event_id"], "follow_ups_networking_event_id_idx");
    table.index(["interaction_id"], "follow_ups_interaction_id_idx");
    table.index(["due_at"], "follow_ups_due_at_idx");
    table.index(["status", "due_at"], "follow_ups_status_due_at_idx");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("follow_ups");
  await knex.schema.dropTableIfExists("interactions");
  await knex.schema.dropTableIfExists("networking_events");
  await knex.schema.dropTableIfExists("contacts");
}
