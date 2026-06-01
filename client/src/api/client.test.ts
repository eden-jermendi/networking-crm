import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ApiError,
  createContact,
  createFollowUp,
  createInteraction,
  createNetworkingEvent,
  getContact,
  getNetworkingEvent,
  listContacts,
  listNetworkingEvents,
  listUpcomingFollowUps,
  updateFollowUp
} from "./client";

const apiBaseUrl = "http://127.0.0.1:3000";

const sampleContact = {
  id: 1,
  name: "Maya Chen",
  role_title: "Senior Frontend Engineer",
  company: "Pixel Foundry",
  linkedin_url: "https://www.linkedin.com/in/maya-chen-example",
  contact_source: "linkedin",
  status: "active",
  notes: "Connected after a React accessibility post.",
  last_contacted_at: "2026-05-28T21:15:00.000Z",
  created_at: "2026-06-01T09:00:00.000Z",
  updated_at: "2026-06-01T09:00:00.000Z"
};

const sampleNetworkingEvent = {
  id: 1,
  name: "Auckland React Meetup: Portfolio Review Night",
  event_type: "meetup",
  starts_at: "2026-05-30T06:00:00.000Z",
  ends_at: "2026-05-30T08:00:00.000Z",
  location: "GridAKL, Auckland",
  event_url: "https://events.example.com/auckland-react-portfolio-review",
  ticket_url: "https://tickets.example.com/auckland-react-portfolio-review",
  notes: "Ask about junior frontend hiring expectations.",
  created_at: "2026-06-01T09:00:00.000Z",
  updated_at: "2026-06-01T09:00:00.000Z"
};

const sampleInteraction = {
  id: 1,
  contact_id: 1,
  networking_event_id: 1,
  interaction_type: "event_conversation",
  scheduled_at: null,
  completed_at: "2026-05-30T07:15:00.000Z",
  notes: "Discussed portfolio framing.",
  next_step: "Send updated README.",
  created_at: "2026-06-01T09:00:00.000Z",
  updated_at: "2026-06-01T09:00:00.000Z"
};

const sampleFollowUp = {
  id: 1,
  contact_id: 1,
  networking_event_id: null,
  interaction_id: 1,
  title: "Send Maya updated portfolio README",
  due_at: "2026-06-04T22:00:00.000Z",
  status: "open",
  notes: "Mention accessibility changes.",
  created_at: "2026-06-01T09:00:00.000Z",
  updated_at: "2026-06-01T09:00:00.000Z"
};

describe("frontend API client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches contacts through the approved endpoints", async () => {
    const fetchMock = mockFetch([sampleContact]);

    await expect(listContacts()).resolves.toEqual([sampleContact]);
    expect(fetchMock).toHaveBeenCalledWith(`${apiBaseUrl}/api/contacts`, {
      body: undefined,
      headers: undefined,
      method: "GET"
    });

    mockFetch(sampleContact);

    await expect(getContact(1)).resolves.toEqual(sampleContact);
    expect(fetch).toHaveBeenLastCalledWith(`${apiBaseUrl}/api/contacts/1`, {
      body: undefined,
      headers: undefined,
      method: "GET"
    });
  });

  it("creates contacts with JSON request bodies", async () => {
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
    const fetchMock = mockFetch({ ...sampleContact, ...input, id: 2 });

    await expect(createContact(input)).resolves.toMatchObject({
      id: 2,
      name: "Priya Singh"
    });
    expect(fetchMock).toHaveBeenCalledWith(`${apiBaseUrl}/api/contacts`, {
      body: JSON.stringify(input),
      headers: { "content-type": "application/json" },
      method: "POST"
    });
  });

  it("fetches and creates networking events", async () => {
    const fetchMock = mockFetch([sampleNetworkingEvent]);

    await expect(listNetworkingEvents()).resolves.toEqual([
      sampleNetworkingEvent
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      `${apiBaseUrl}/api/networking-events`,
      {
        body: undefined,
        headers: undefined,
        method: "GET"
      }
    );

    mockFetch(sampleNetworkingEvent);
    await expect(getNetworkingEvent(1)).resolves.toEqual(sampleNetworkingEvent);

    const input = {
      name: "Women in Web: Junior Portfolio Clinic",
      event_type: "meetup",
      starts_at: "2026-06-12T06:00:00.000Z",
      ends_at: "2026-06-12T08:00:00.000Z",
      location: "Auckland CBD",
      event_url: "https://events.example.com/women-in-web-portfolio-clinic",
      ticket_url: null,
      notes: "Bring full-stack portfolio questions."
    };

    mockFetch({ ...sampleNetworkingEvent, ...input, id: 2 });
    await expect(createNetworkingEvent(input)).resolves.toMatchObject({
      id: 2,
      name: input.name
    });
    expect(fetch).toHaveBeenLastCalledWith(
      `${apiBaseUrl}/api/networking-events`,
      {
        body: JSON.stringify(input),
        headers: { "content-type": "application/json" },
        method: "POST"
      }
    );
  });

  it("creates interactions", async () => {
    const input = {
      contact_id: 1,
      networking_event_id: 1,
      interaction_type: "event_conversation",
      scheduled_at: null,
      completed_at: "2026-05-30T07:15:00.000Z",
      notes: "Discussed portfolio framing.",
      next_step: "Send updated README."
    };
    const fetchMock = mockFetch(sampleInteraction);

    await expect(createInteraction(input)).resolves.toEqual(sampleInteraction);
    expect(fetchMock).toHaveBeenCalledWith(`${apiBaseUrl}/api/interactions`, {
      body: JSON.stringify(input),
      headers: { "content-type": "application/json" },
      method: "POST"
    });
  });

  it("fetches, creates, and updates follow-ups", async () => {
    const fetchMock = mockFetch([sampleFollowUp]);

    await expect(listUpcomingFollowUps()).resolves.toEqual([sampleFollowUp]);
    expect(fetchMock).toHaveBeenCalledWith(
      `${apiBaseUrl}/api/follow-ups/upcoming`,
      {
        body: undefined,
        headers: undefined,
        method: "GET"
      }
    );

    const createInput = {
      contact_id: 1,
      networking_event_id: null,
      interaction_id: 1,
      title: "Send Maya updated portfolio README",
      due_at: "2026-06-04T22:00:00.000Z",
      status: "open",
      notes: "Mention accessibility changes."
    };

    mockFetch(sampleFollowUp);
    await expect(createFollowUp(createInput)).resolves.toEqual(sampleFollowUp);

    mockFetch({ ...sampleFollowUp, status: "completed" });
    await expect(updateFollowUp(1, { status: "completed" })).resolves.toEqual({
      ...sampleFollowUp,
      status: "completed"
    });
    expect(fetch).toHaveBeenLastCalledWith(`${apiBaseUrl}/api/follow-ups/1`, {
      body: JSON.stringify({ status: "completed" }),
      headers: { "content-type": "application/json" },
      method: "PATCH"
    });
  });

  it("throws structured API errors", async () => {
    mockFetch(
      {
        error: {
          code: "validation_error",
          details: ["name is required"],
          message: "Validation failed"
        }
      },
      { status: 400 }
    );

    await expect(createContact({} as never)).rejects.toMatchObject({
      code: "validation_error",
      details: ["name is required"],
      message: "Validation failed",
      status: 400
    });
  });

  it("throws fallback errors for non-standard failures", async () => {
    mockFetch("Service unavailable", { status: 503 });

    await expect(listContacts()).rejects.toEqual(
      new ApiError(503, "request_failed", "Request failed")
    );
  });
});

function mockFetch(
  body: unknown,
  options: { status?: number } = {}
): ReturnType<typeof vi.fn> {
  const status = options.status ?? 200;
  const responseBody = typeof body === "string" ? body : JSON.stringify(body);
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(responseBody, {
      headers: { "content-type": "application/json" },
      status
    })
  );

  vi.stubGlobal("fetch", fetchMock);

  return fetchMock;
}
