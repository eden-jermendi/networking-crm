import { Router } from "express";
import type { Request, Response } from "express";
import type { createContactRepository } from "../db/repositories/contacts.js";
import type { createFollowUpRepository } from "../db/repositories/followUps.js";
import type { createInteractionRepository } from "../db/repositories/interactions.js";
import type { createNetworkingEventRepository } from "../db/repositories/networkingEvents.js";
import type {
  CreateContactInput,
  CreateFollowUpInput,
  CreateInteractionInput,
  CreateNetworkingEventInput,
  UpdateFollowUpInput
} from "../db/types.js";

export type ApiDependencies = {
  contacts: ReturnType<typeof createContactRepository>;
  followUps: ReturnType<typeof createFollowUpRepository>;
  interactions: ReturnType<typeof createInteractionRepository>;
  networkingEvents: ReturnType<typeof createNetworkingEventRepository>;
};

export function createApiRouter(dependencies: ApiDependencies) {
  const router = Router();

  router.get("/contacts", async (_request, response) => {
    response.json(await dependencies.contacts.listContacts());
  });

  router.get("/contacts/:id", async (request, response) => {
    const id = Number(request.params.id);
    const contact = await dependencies.contacts.getContactById(id);

    sendRecordOrNotFound(response, contact);
  });

  router.post(
    "/contacts",
    async (request: Request<unknown, unknown, CreateContactInput>, response) => {
      const contact = await dependencies.contacts.createContact(request.body);

      response.status(201).json(contact);
    }
  );

  router.get("/networking-events", async (_request, response) => {
    response.json(await dependencies.networkingEvents.listNetworkingEvents());
  });

  router.get("/networking-events/:id", async (request, response) => {
    const id = Number(request.params.id);
    const networkingEvent =
      await dependencies.networkingEvents.getNetworkingEventById(id);

    sendRecordOrNotFound(response, networkingEvent);
  });

  router.post(
    "/networking-events",
    async (
      request: Request<unknown, unknown, CreateNetworkingEventInput>,
      response
    ) => {
      const networkingEvent =
        await dependencies.networkingEvents.createNetworkingEvent(request.body);

      response.status(201).json(networkingEvent);
    }
  );

  router.post(
    "/interactions",
    async (
      request: Request<unknown, unknown, CreateInteractionInput>,
      response
    ) => {
      const interaction = await dependencies.interactions.createInteraction(
        request.body
      );

      response.status(201).json(interaction);
    }
  );

  router.get("/follow-ups/upcoming", async (_request, response) => {
    response.json(await dependencies.followUps.listUpcomingFollowUps());
  });

  router.post(
    "/follow-ups",
    async (request: Request<unknown, unknown, CreateFollowUpInput>, response) => {
      const followUp = await dependencies.followUps.createFollowUp(request.body);

      response.status(201).json(followUp);
    }
  );

  router.patch(
    "/follow-ups/:id",
    async (
      request: Request<{ id: string }, unknown, UpdateFollowUpInput>,
      response
    ) => {
      const id = Number(request.params.id);
      const followUp = await dependencies.followUps.updateFollowUp(
        id,
        request.body
      );

      sendRecordOrNotFound(response, followUp);
    }
  );

  return router;
}

function sendRecordOrNotFound<T>(response: Response, record: T | undefined) {
  if (!record) {
    response.status(404).json({ error: "Not found" });
    return;
  }

  response.json(record);
}
