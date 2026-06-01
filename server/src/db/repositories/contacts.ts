import type { Knex } from "knex";
import type { Contact, CreateContactInput } from "../types.js";

export function createContactRepository(database: Knex) {
  async function getContactById(id: number): Promise<Contact | undefined> {
    return database<Contact>("contacts").where({ id }).first();
  }

  return {
    async listContacts(): Promise<Contact[]> {
      return database<Contact>("contacts").select("*").orderBy("name", "asc");
    },

    getContactById,

    async createContact(input: CreateContactInput): Promise<Contact> {
      const timestamp = new Date().toISOString();
      const [id] = await database<Contact>("contacts").insert({
        ...input,
        created_at: timestamp,
        updated_at: timestamp
      });

      const contact = await getContactById(Number(id));

      if (!contact) {
        throw new Error("Failed to create contact");
      }

      return contact;
    }
  };
}
