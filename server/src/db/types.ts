export type Timestamp = string;

export type Contact = {
  id: number;
  name: string;
  role_title: string | null;
  company: string | null;
  linkedin_url: string | null;
  contact_source: string;
  status: string;
  notes: string | null;
  last_contacted_at: Timestamp | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type CreateContactInput = Omit<Contact, "id" | "created_at" | "updated_at">;

export type NetworkingEvent = {
  id: number;
  name: string;
  event_type: string;
  starts_at: Timestamp;
  ends_at: Timestamp | null;
  location: string | null;
  event_url: string | null;
  ticket_url: string | null;
  notes: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type CreateNetworkingEventInput = Omit<
  NetworkingEvent,
  "id" | "created_at" | "updated_at"
>;

export type Interaction = {
  id: number;
  contact_id: number;
  networking_event_id: number | null;
  interaction_type: string;
  scheduled_at: Timestamp | null;
  completed_at: Timestamp | null;
  notes: string | null;
  next_step: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type CreateInteractionInput = Omit<
  Interaction,
  "id" | "created_at" | "updated_at"
>;

export type FollowUp = {
  id: number;
  contact_id: number | null;
  networking_event_id: number | null;
  interaction_id: number | null;
  title: string;
  due_at: Timestamp;
  status: string;
  notes: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type CreateFollowUpInput = Omit<FollowUp, "id" | "created_at" | "updated_at">;

export type UpdateFollowUpInput = Partial<
  Pick<
    FollowUp,
    | "contact_id"
    | "networking_event_id"
    | "interaction_id"
    | "title"
    | "due_at"
    | "status"
    | "notes"
  >
>;
