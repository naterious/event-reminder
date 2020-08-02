import Bull from "bull";

import { EventReminderQueue } from "../../core/contracts";

export const eventReminderQueue: EventReminderQueue = new Bull("event-reminders");
