import knex, { type Knex } from "knex";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  down,
  up
} from "../../migrations/20260601000000_create_mvp1_tables.js";

type TableColumn = {
  name: string;
  notnull: number;
  dflt_value: string | null;
  pk: number;
};

type ForeignKey = {
  from: string;
  table: string;
  to: string;
  on_delete: string;
};

type IndexRow = {
  name: string;
};

describe("MVP 1 schema migration", () => {
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
  });

  afterEach(async () => {
    await db.destroy();
  });

  it("creates the approved MVP 1 tables and no CRM extras", async () => {
    await up(db);

    const tables = await tableNames(db);

    expect(tables).toEqual([
      "contacts",
      "follow_ups",
      "interactions",
      "networking_events"
    ]);
    expect(tables).not.toContain("contact_events");
  });

  it("creates columns with approved required fields and no timestamp defaults", async () => {
    await up(db);

    expect(await columnsFor(db, "contacts")).toMatchObject({
      id: { notnull: 1, pk: 1 },
      name: { notnull: 1, dflt_value: null },
      role_title: { notnull: 0, dflt_value: null },
      company: { notnull: 0, dflt_value: null },
      linkedin_url: { notnull: 0, dflt_value: null },
      contact_source: { notnull: 1, dflt_value: null },
      status: { notnull: 1, dflt_value: null },
      notes: { notnull: 0, dflt_value: null },
      last_contacted_at: { notnull: 0, dflt_value: null },
      created_at: { notnull: 1, dflt_value: null },
      updated_at: { notnull: 1, dflt_value: null }
    });

    expect(await columnsFor(db, "networking_events")).toMatchObject({
      id: { notnull: 1, pk: 1 },
      name: { notnull: 1, dflt_value: null },
      event_type: { notnull: 1, dflt_value: null },
      starts_at: { notnull: 1, dflt_value: null },
      ends_at: { notnull: 0, dflt_value: null },
      location: { notnull: 0, dflt_value: null },
      event_url: { notnull: 0, dflt_value: null },
      ticket_url: { notnull: 0, dflt_value: null },
      notes: { notnull: 0, dflt_value: null },
      created_at: { notnull: 1, dflt_value: null },
      updated_at: { notnull: 1, dflt_value: null }
    });

    expect(await columnsFor(db, "interactions")).toMatchObject({
      id: { notnull: 1, pk: 1 },
      contact_id: { notnull: 1, dflt_value: null },
      networking_event_id: { notnull: 0, dflt_value: null },
      interaction_type: { notnull: 1, dflt_value: null },
      scheduled_at: { notnull: 0, dflt_value: null },
      completed_at: { notnull: 0, dflt_value: null },
      notes: { notnull: 0, dflt_value: null },
      next_step: { notnull: 0, dflt_value: null },
      created_at: { notnull: 1, dflt_value: null },
      updated_at: { notnull: 1, dflt_value: null }
    });

    expect(await columnsFor(db, "follow_ups")).toMatchObject({
      id: { notnull: 1, pk: 1 },
      contact_id: { notnull: 0, dflt_value: null },
      networking_event_id: { notnull: 0, dflt_value: null },
      interaction_id: { notnull: 0, dflt_value: null },
      title: { notnull: 1, dflt_value: null },
      due_at: { notnull: 1, dflt_value: null },
      status: { notnull: 1, dflt_value: null },
      notes: { notnull: 0, dflt_value: null },
      created_at: { notnull: 1, dflt_value: null },
      updated_at: { notnull: 1, dflt_value: null }
    });
  });

  it("creates approved foreign keys with RESTRICT delete behavior", async () => {
    await up(db);

    expect(await foreignKeysFor(db, "interactions")).toEqual(
      expect.arrayContaining([
        {
          from: "contact_id",
          table: "contacts",
          to: "id",
          on_delete: "RESTRICT"
        },
        {
          from: "networking_event_id",
          table: "networking_events",
          to: "id",
          on_delete: "RESTRICT"
        }
      ])
    );

    expect(await foreignKeysFor(db, "follow_ups")).toEqual(
      expect.arrayContaining([
        {
          from: "contact_id",
          table: "contacts",
          to: "id",
          on_delete: "RESTRICT"
        },
        {
          from: "networking_event_id",
          table: "networking_events",
          to: "id",
          on_delete: "RESTRICT"
        },
        {
          from: "interaction_id",
          table: "interactions",
          to: "id",
          on_delete: "RESTRICT"
        }
      ])
    );
  });

  it("creates approved indexes for relationships and upcoming follow-ups", async () => {
    await up(db);

    expect(await indexNamesFor(db, "interactions")).toEqual(
      expect.arrayContaining([
        "interactions_contact_id_idx",
        "interactions_networking_event_id_idx"
      ])
    );

    expect(await indexNamesFor(db, "follow_ups")).toEqual(
      expect.arrayContaining([
        "follow_ups_contact_id_idx",
        "follow_ups_due_at_idx",
        "follow_ups_interaction_id_idx",
        "follow_ups_networking_event_id_idx",
        "follow_ups_status_due_at_idx"
      ])
    );
  });

  it("rolls back the approved MVP 1 tables", async () => {
    await up(db);
    await down(db);

    expect(await tableNames(db)).toEqual([]);
  });
});

async function tableNames(db: Knex): Promise<string[]> {
  const rows = await db<{ name: string }>("sqlite_master")
    .select("name")
    .where("type", "table")
    .whereRaw("name not like 'sqlite_%'")
    .orderBy("name");

  return rows.map((row) => row.name);
}

async function columnsFor(
  db: Knex,
  tableName: string
): Promise<Record<string, TableColumn>> {
  const result = await db.raw<TableColumn[]>(`PRAGMA table_info(${tableName})`);

  return Object.fromEntries(
    result.map((column) => [
      column.name,
      {
        name: column.name,
        notnull: column.notnull,
        dflt_value: column.dflt_value,
        pk: column.pk
      }
    ])
  );
}

async function foreignKeysFor(
  db: Knex,
  tableName: string
): Promise<ForeignKey[]> {
  const result = await db.raw<ForeignKey[]>(
    `PRAGMA foreign_key_list(${tableName})`
  );

  return result.map((foreignKey) => ({
    from: foreignKey.from,
    table: foreignKey.table,
    to: foreignKey.to,
    on_delete: foreignKey.on_delete
  }));
}

async function indexNamesFor(db: Knex, tableName: string): Promise<string[]> {
  const result = await db.raw<IndexRow[]>(`PRAGMA index_list(${tableName})`);

  return result.map((index) => index.name).sort();
}
