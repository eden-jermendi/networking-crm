import type { Knex } from "knex";
import type {
  CreateNetworkingEventInput,
  NetworkingEvent
} from "../types.js";

export function createNetworkingEventRepository(database: Knex) {
  async function getNetworkingEventById(
    id: number
  ): Promise<NetworkingEvent | undefined> {
    return database<NetworkingEvent>("networking_events").where({ id }).first();
  }

  return {
    async listNetworkingEvents(): Promise<NetworkingEvent[]> {
      return database<NetworkingEvent>("networking_events")
        .select("*")
        .orderBy("starts_at", "asc");
    },

    getNetworkingEventById,

    async createNetworkingEvent(
      input: CreateNetworkingEventInput
    ): Promise<NetworkingEvent> {
      const timestamp = new Date().toISOString();
      const [id] = await database<NetworkingEvent>("networking_events").insert({
        ...input,
        created_at: timestamp,
        updated_at: timestamp
      });

      const networkingEvent = await getNetworkingEventById(Number(id));

      if (!networkingEvent) {
        throw new Error("Failed to create networking event");
      }

      return networkingEvent;
    }
  };
}
