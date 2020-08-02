import { eventReminderQueue } from "./queue";
import { AddEventReminderToQueue } from "../../core/contracts";

export const addEventReminderToQueue: AddEventReminderToQueue = (eventDetails) => {
  return eventReminderQueue.add(
    eventDetails.name,
    { name: eventDetails.name },
    { delay: eventDetails.delay, removeOnComplete: true }
  );
};