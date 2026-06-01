import type { Knex } from "knex";
import type { CreateInteractionInput, Interaction } from "../types.js";

export function createInteractionRepository(database: Knex) {
  return {
    async createInteraction(input: CreateInteractionInput): Promise<Interaction> {
      const timestamp = new Date().toISOString();
      const [id] = await database<Interaction>("interactions").insert({
        ...input,
        created_at: timestamp,
        updated_at: timestamp
      });

      const interaction = await database<Interaction>("interactions")
        .where({ id: Number(id) })
        .first();

      if (!interaction) {
        throw new Error("Failed to create interaction");
      }

      return interaction;
    }
  };
}
