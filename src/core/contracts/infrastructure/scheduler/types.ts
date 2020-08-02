import Bull from "bull";

import { IEventReminderDetails } from "./interfaces";

export type AddEventReminderToQueue = (
  eventReminderDetails: IEventReminderDetails
) => void;

export type EventReminderQueue = Bull.Queue;