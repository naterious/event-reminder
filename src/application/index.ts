import { EventEmitter } from "events";

import composeSetEventReminder from "./setEventReminder/setEventReminderService";
import composeProcessMessages from "./processMessages/processMessagesService";

import { EventReminderQueue, AddEventReminderToQueue } from "../core/contracts";

export interface IApplicationDependencies {
  eventReminderQueue: EventReminderQueue;
  eventEmitter: EventEmitter;
  addEventReminderToQueue: AddEventReminderToQueue;
}

export default (dependencies: IApplicationDependencies) => {
  const setEventReminderService = composeSetEventReminder(dependencies);
  const processMessagesService = composeProcessMessages(dependencies);

  return {
    setEventReminderService,
    processMessagesService,
  };
};