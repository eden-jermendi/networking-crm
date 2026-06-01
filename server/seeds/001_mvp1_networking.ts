import type { Knex } from "knex";

const now = "2026-06-01T09:00:00.000Z";

export async function seed(knex: Knex): Promise<void> {
  await knex("follow_ups").del();
  await knex("interactions").del();
  await knex("networking_events").del();
  await knex("contacts").del();

  await knex("contacts").insert([
    {
      id: 1,
      name: "Maya Chen",
      role_title: "Senior Frontend Engineer",
      company: "Pixel Foundry",
      linkedin_url: "https://www.linkedin.com/in/maya-chen-example",
      contact_source: "linkedin",
      status: "active",
      notes:
        "Connected after commenting on her React accessibility post. Good person to ask about portfolio review and junior frontend expectations.",
      last_contacted_at: "2026-05-28T21:15:00.000Z",
      created_at: now,
      updated_at: now
    },
    {
      id: 2,
      name: "Liam Patel",
      role_title: "Engineering Manager",
      company: "Kowhai Digital",
      linkedin_url: "https://www.linkedin.com/in/liam-patel-example",
      contact_source: "networking_event",
      status: "follow_up_due",
      notes:
        "Met at the Auckland React meetup. Suggested sending a concise CV plus one deployed project with a clear README.",
      last_contacted_at: "2026-05-30T07:45:00.000Z",
      created_at: now,
      updated_at: now
    },
    {
      id: 3,
      name: "Sofia Martinez",
      role_title: "Technical Recruiter",
      company: "TalentBridge NZ",
      linkedin_url: "https://www.linkedin.com/in/sofia-martinez-example",
      contact_source: "recruiter",
      status: "warm_lead",
      notes:
        "Recruiter focused on junior web roles. Asked for availability and a short summary of preferred stack.",
      last_contacted_at: "2026-05-27T02:30:00.000Z",
      created_at: now,
      updated_at: now
    },
    {
      id: 4,
      name: "Noah Williams",
      role_title: "Junior Developer",
      company: "ProductLoop",
      linkedin_url: "https://www.linkedin.com/in/noah-williams-example",
      contact_source: "bootcamp_alumni",
      status: "active",
      notes:
        "Bootcamp alumni who recently landed a junior role. Offered to share notes on take-home project prep.",
      last_contacted_at: "2026-05-24T23:00:00.000Z",
      created_at: now,
      updated_at: now
    }
  ]);

  await knex("networking_events").insert([
    {
      id: 1,
      name: "Auckland React Meetup: Portfolio Review Night",
      event_type: "meetup",
      starts_at: "2026-05-30T06:00:00.000Z",
      ends_at: "2026-05-30T08:00:00.000Z",
      location: "GridAKL, Auckland",
      event_url: "https://events.example.com/auckland-react-portfolio-review",
      ticket_url: "https://tickets.example.com/auckland-react-portfolio-review",
      notes:
        "Bring portfolio questions, ask about junior frontend hiring expectations, and collect feedback on CRM project framing.",
      created_at: now,
      updated_at: now
    },
    {
      id: 2,
      name: "Junior Dev Coffee Chats: Hiring Manager AMA",
      event_type: "community_event",
      starts_at: "2026-06-06T22:00:00.000Z",
      ends_at: "2026-06-06T23:30:00.000Z",
      location: "Online",
      event_url: "https://events.example.com/junior-dev-coffee-ama",
      ticket_url: null,
      notes:
        "Useful for practicing concise intro, asking about entry-level interview loops, and finding follow-up coffee chats.",
      created_at: now,
      updated_at: now
    }
  ]);

  await knex("interactions").insert([
    {
      id: 1,
      contact_id: 1,
      networking_event_id: null,
      interaction_type: "linkedin_message",
      scheduled_at: null,
      completed_at: "2026-05-28T21:15:00.000Z",
      notes:
        "Maya replied with advice to lead portfolio notes with measurable outcomes and accessibility decisions.",
      next_step: "Send refreshed portfolio link after README improvements.",
      created_at: now,
      updated_at: now
    },
    {
      id: 2,
      contact_id: 2,
      networking_event_id: 1,
      interaction_type: "event_conversation",
      scheduled_at: "2026-05-30T06:00:00.000Z",
      completed_at: "2026-05-30T07:45:00.000Z",
      notes:
        "Discussed junior React openings and what makes networking follow-up emails useful rather than generic.",
      next_step: "Email CV, portfolio, and two-sentence project summary.",
      created_at: now,
      updated_at: now
    },
    {
      id: 3,
      contact_id: 3,
      networking_event_id: null,
      interaction_type: "intro_call",
      scheduled_at: "2026-06-03T01:00:00.000Z",
      completed_at: null,
      notes:
        "Planned intro call to discuss junior full-stack roles using React, TypeScript, Node, and SQLite/Knex project examples.",
      next_step: "Prepare concise job-search pitch and salary/location preferences.",
      created_at: now,
      updated_at: now
    },
    {
      id: 4,
      contact_id: 4,
      networking_event_id: 2,
      interaction_type: "coffee_chat",
      scheduled_at: "2026-06-07T00:15:00.000Z",
      completed_at: null,
      notes:
        "Ask about the transition from bootcamp projects to production tasks and how he described his first role interviews.",
      next_step: "Confirm calendar time after AMA event.",
      created_at: now,
      updated_at: now
    }
  ]);

  await knex("follow_ups").insert([
    {
      id: 1,
      contact_id: 1,
      networking_event_id: null,
      interaction_id: 1,
      title: "Send Maya updated portfolio README",
      due_at: "2026-06-04T22:00:00.000Z",
      status: "open",
      notes:
        "Mention the accessibility changes and ask if the project summary now reads clearly for a junior frontend role.",
      created_at: now,
      updated_at: now
    },
    {
      id: 2,
      contact_id: 2,
      networking_event_id: 1,
      interaction_id: 2,
      title: "Email Liam CV and CRM project summary",
      due_at: "2026-06-02T21:00:00.000Z",
      status: "open",
      notes:
        "Keep it concise: thank him for meetup advice, attach CV, link portfolio, summarize CRM as structured SDLC project.",
      created_at: now,
      updated_at: now
    },
    {
      id: 3,
      contact_id: 3,
      networking_event_id: null,
      interaction_id: 3,
      title: "Prepare recruiter intro-call talking points",
      due_at: "2026-06-02T09:00:00.000Z",
      status: "open",
      notes:
        "Include preferred stack, availability, remote/hybrid preference, and two strongest portfolio projects.",
      created_at: now,
      updated_at: now
    },
    {
      id: 4,
      contact_id: null,
      networking_event_id: 2,
      interaction_id: null,
      title: "RSVP and prepare AMA question list",
      due_at: "2026-06-05T20:00:00.000Z",
      status: "open",
      notes:
        "Ask what hiring managers expect from junior dev networking follow-ups and what project evidence matters most.",
      created_at: now,
      updated_at: now
    }
  ]);
}
