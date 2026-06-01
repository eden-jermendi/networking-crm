import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../../src/app.js";
import type { ApiDependencies } from "../../src/routes/api.js";

const sampleContact = {
  id: 1,
  name: "Maya Chen",
  role_title: "Frontend Engineer",
  company: "Kauri Digital",
  linkedin_url: "https://www.linkedin.com/in/maya-chen-example",
  contact_source: "linkedin",
  status: "active",
  notes: "Met through a React portfolio review thread.",
  last_contacted_at: "2026-05-28T21:00:00.000Z",
  created_at: "2026-06-01T00:00:00.000Z",
  updated_at: "2026-06-01T00:00:00.000Z"
};

const sampleNetworkingEvent = {
  id: 1,
  name: "Auckland React Meetup: Portfolio Review Night",
  event_type: "meetup",
  starts_at: "2026-06-05T06:00:00.000Z",
  ends_at: "2026-06-05T08:00:00.000Z",
  location: "Auckland CBD",
  event_url: "https://events.example.com/auckland-react-portfolio-review",
  ticket_url: null,
  notes: "Bring questions about junior React portfolio positioning.",
  created_at: "2026-06-01T00:00:00.000Z",
  updated_at: "2026-06-01T00:00:00.000Z"
};

const sampleInteraction = {
  id: 1,
  contact_id: 1,
  networking_event_id: 1,
  interaction_type: "event_conversation",
  scheduled_at: null,
  completed_at: "2026-06-05T07:00:00.000Z",
  notes: "Talked through portfolio review feedback.",
  next_step: "Send updated README.",
  created_at: "2026-06-01T00:00:00.000Z",
  updated_at: "2026-06-01T00:00:00.000Z"
};

const sampleFollowUp = {
  id: 1,
  contact_id: 1,
  networking_event_id: 1,
  interaction_id: 1,
  title: "Send Maya updated portfolio README",
  due_at: "2026-06-07T22:00:00.000Z",
  status: "open",
  notes: "Include updated testing notes.",
  created_at: "2026-06-01T00:00:00.000Z",
  updated_at: "2026-06-01T00:00:00.000Z"
};

describe("api routes", () => {
  let dependencies: ApiDependencies;

  beforeEach(() => {
    dependencies = {
      contacts: {
        listContacts: vi.fn().mockResolvedValue([sampleContact]),
        getContactById: vi.fn().mockResolvedValue(sampleContact),
        createContact: vi.fn().mockResolvedValue(sampleContact)
      },
      followUps: {
        listUpcomingFollowUps: vi.fn().mockResolvedValue([sampleFollowUp]),
        getFollowUpById: vi.fn().mockResolvedValue(sampleFollowUp),
        createFollowUp: vi.fn().mockResolvedValue(sampleFollowUp),
        updateFollowUp: vi.fn().mockResolvedValue({
          ...sampleFollowUp,
          status: "completed"
        })
      },
      interactions: {
        createInteraction: vi.fn().mockResolvedValue(sampleInteraction)
      },
      networkingEvents: {
        listNetworkingEvents: vi.fn().mockResolvedValue([sampleNetworkingEvent]),
        getNetworkingEventById: vi.fn().mockResolvedValue(sampleNetworkingEvent),
        createNetworkingEvent: vi.fn().mockResolvedValue(sampleNetworkingEvent)
      }
    };
  });

  it("keeps the health route unchanged", async () => {
    const response = await requestJson(dependencies, "/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("lists contacts and returns a contact by id", async () => {
    const listResponse = await requestJson(dependencies, "/api/contacts");
    const detailResponse = await requestJson(dependencies, "/api/contacts/1");

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toEqual([sampleContact]);
    expect(detailResponse.status).toBe(200);
    expect(detailResponse.body).toEqual(sampleContact);
    expect(dependencies.contacts.getContactById).toHaveBeenCalledWith(1);
  });

  it("creates contacts", async () => {
    const input = {
      name: "Priya Singh",
      role_title: "Backend Engineer",
      company: "Harbour Labs",
      linkedin_url: "https://www.linkedin.com/in/priya-singh-example",
      contact_source: "referral",
      status: "new",
      notes: "Referral from a meetup attendee.",
      last_contacted_at: null
    };

    const response = await requestJson(dependencies, "/api/contacts", {
      body: input,
      method: "POST"
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(sampleContact);
    expect(dependencies.contacts.createContact).toHaveBeenCalledWith(input);
  });

  it("returns not found for missing contacts", async () => {
    vi.mocked(dependencies.contacts.getContactById).mockResolvedValue(undefined);

    const response = await requestJson(dependencies, "/api/contacts/404");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Not found" });
  });

  it("lists networking events and returns a networking event by id", async () => {
    const listResponse = await requestJson(
      dependencies,
      "/api/networking-events"
    );
    const detailResponse = await requestJson(
      dependencies,
      "/api/networking-events/1"
    );

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toEqual([sampleNetworkingEvent]);
    expect(detailResponse.status).toBe(200);
    expect(detailResponse.body).toEqual(sampleNetworkingEvent);
    expect(
      dependencies.networkingEvents.getNetworkingEventById
    ).toHaveBeenCalledWith(1);
  });

  it("creates networking events", async () => {
    const input = {
      name: "Women in Web: Junior Portfolio Clinic",
      event_type: "meetup",
      starts_at: "2026-06-12T06:00:00.000Z",
      ends_at: "2026-06-12T08:00:00.000Z",
      location: "Auckland CBD",
      event_url: "https://events.example.com/women-in-web-portfolio-clinic",
      ticket_url: null,
      notes: "Bring questions about full-stack portfolio projects."
    };

    const response = await requestJson(
      dependencies,
      "/api/networking-events",
      {
        body: input,
        method: "POST"
      }
    );

    expect(response.status).toBe(201);
    expect(response.body).toEqual(sampleNetworkingEvent);
    expect(
      dependencies.networkingEvents.createNetworkingEvent
    ).toHaveBeenCalledWith(input);
  });

  it("returns not found for missing networking events", async () => {
    vi.mocked(
      dependencies.networkingEvents.getNetworkingEventById
    ).mockResolvedValue(undefined);

    const response = await requestJson(
      dependencies,
      "/api/networking-events/404"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Not found" });
  });

  it("creates interactions", async () => {
    const input = {
      contact_id: 1,
      networking_event_id: 1,
      interaction_type: "event_conversation",
      scheduled_at: null,
      completed_at: "2026-06-05T07:00:00.000Z",
      notes: "Talked through portfolio review feedback.",
      next_step: "Send updated README."
    };

    const response = await requestJson(dependencies, "/api/interactions", {
      body: input,
      method: "POST"
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(sampleInteraction);
    expect(dependencies.interactions.createInteraction).toHaveBeenCalledWith(
      input
    );
  });

  it("lists upcoming follow-ups", async () => {
    const response = await requestJson(dependencies, "/api/follow-ups/upcoming");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([sampleFollowUp]);
    expect(dependencies.followUps.listUpcomingFollowUps).toHaveBeenCalledOnce();
  });

  it("creates follow-ups", async () => {
    const input = {
      contact_id: 1,
      networking_event_id: 1,
      interaction_id: 1,
      title: "Send Maya updated portfolio README",
      due_at: "2026-06-07T22:00:00.000Z",
      status: "open",
      notes: "Include updated testing notes."
    };

    const response = await requestJson(dependencies, "/api/follow-ups", {
      body: input,
      method: "POST"
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(sampleFollowUp);
    expect(dependencies.followUps.createFollowUp).toHaveBeenCalledWith(input);
  });

  it("updates follow-ups and supports completion", async () => {
    const response = await requestJson(dependencies, "/api/follow-ups/1", {
      body: { status: "completed" },
      method: "PATCH"
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...sampleFollowUp, status: "completed" });
    expect(dependencies.followUps.updateFollowUp).toHaveBeenCalledWith(1, {
      status: "completed"
    });
  });

  it("returns not found for missing follow-ups", async () => {
    vi.mocked(dependencies.followUps.updateFollowUp).mockResolvedValue(undefined);

    const response = await requestJson(dependencies, "/api/follow-ups/404", {
      body: { status: "completed" },
      method: "PATCH"
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Not found" });
  });
});

async function requestJson(
  dependencies: ApiDependencies,
  path: string,
  options: { body?: unknown; method?: string } = {}
) {
  const app = createApp(dependencies);
  const request = {
    body: options.body,
    headers: {},
    method: options.method ?? "GET",
    url: path
  };

  return new Promise<{ body: unknown; status: number }>((resolve, reject) => {
    let settled = false;
    const response = {
      headersSent: false,
      statusCode: 200,
      end() {
        if (!settled) {
          settled = true;
          resolve({ body: undefined, status: this.statusCode });
        }
      },
      getHeader() {
        return undefined;
      },
      json(body: unknown) {
        this.headersSent = true;
        if (!settled) {
          settled = true;
          resolve({ body, status: this.statusCode });
        }

        return this;
      },
      setHeader() {
        return this;
      },
      status(statusCode: number) {
        this.statusCode = statusCode;

        return this;
      }
    };

    const dispatch = app as unknown as (
      request: unknown,
      response: unknown,
      next: (error: unknown) => void
    ) => void;

    dispatch(request, response, (error: unknown) => {
      if (error) {
        reject(error);
        return;
      }

      if (!settled) {
        settled = true;
        resolve({ body: undefined, status: response.statusCode });
      }
    });
  });
}
