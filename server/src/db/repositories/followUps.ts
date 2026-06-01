import type { Knex } from "knex";
import type {
  CreateFollowUpInput,
  FollowUp,
  UpdateFollowUpInput
} from "../types.js";

export function createFollowUpRepository(database: Knex) {
  async function getFollowUpById(id: number): Promise<FollowUp | undefined> {
    return database<FollowUp>("follow_ups").where({ id }).first();
  }

  return {
    async listUpcomingFollowUps(): Promise<FollowUp[]> {
      return database<FollowUp>("follow_ups")
        .select("*")
        .whereNot("status", "completed")
        .orderBy("due_at", "asc");
    },

    getFollowUpById,

    async createFollowUp(input: CreateFollowUpInput): Promise<FollowUp> {
      const timestamp = new Date().toISOString();
      const [id] = await database<FollowUp>("follow_ups").insert({
        ...input,
        created_at: timestamp,
        updated_at: timestamp
      });

      const followUp = await getFollowUpById(Number(id));

      if (!followUp) {
        throw new Error("Failed to create follow-up");
      }

      return followUp;
    },

    async updateFollowUp(
      id: number,
      input: UpdateFollowUpInput
    ): Promise<FollowUp | undefined> {
      const timestamp = new Date().toISOString();

      await database<FollowUp>("follow_ups")
        .where({ id })
        .update({
          ...input,
          updated_at: timestamp
        });

      return getFollowUpById(id);
    }
  };
}
