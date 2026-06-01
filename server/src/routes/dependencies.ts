import { db } from "../db/connection.js";
import {
  createContactRepository,
  createFollowUpRepository,
  createInteractionRepository,
  createNetworkingEventRepository
} from "../db/repositories/index.js";
import type { ApiDependencies } from "./api.js";

export function createDefaultApiDependencies(): ApiDependencies {
  return {
    contacts: createContactRepository(db),
    followUps: createFollowUpRepository(db),
    interactions: createInteractionRepository(db),
    networkingEvents: createNetworkingEventRepository(db)
  };
}
