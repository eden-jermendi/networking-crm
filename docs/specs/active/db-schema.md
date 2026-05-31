# DBML schema

Table contacts {
id integer [pk, increment]
name varchar [not null]
role_title varchar
company varchar
linkedin_url varchar
contact_source varchar [not null]
status varchar [not null]
notes text
last_contacted_at timestamp
created_at timestamp [not null]
updated_at timestamp [not null]
}

Table networking_events {
id integer [pk, increment]
name varchar [not null]
event_type varchar [not null]
starts_at timestamp [not null]
ends_at timestamp
location varchar
event_url varchar
ticket_url varchar
notes text
created_at timestamp [not null]
updated_at timestamp [not null]
}

Table interactions {
id integer [pk, increment]
contact_id integer [not null, ref: > contacts.id]
networking_event_id integer [ref: > networking_events.id]
interaction_type varchar [not null]
scheduled_at timestamp
completed_at timestamp
notes text
next_step text
created_at timestamp [not null]
updated_at timestamp [not null]
}

Table follow_ups {
id integer [pk, increment]
contact_id integer [ref: > contacts.id]
networking_event_id integer [ref: > networking_events.id]
interaction_id integer [ref: > interactions.id]
title varchar [not null]
due_at timestamp [not null]
status varchar [not null]
notes text
created_at timestamp [not null]
updated_at timestamp [not null]
}
