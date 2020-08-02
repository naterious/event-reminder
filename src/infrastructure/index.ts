import {logger} from "./logger";
import {eventReminderQueue, addEventReminderToQueue} from "./scheduler";
import {eventEmitter} from "./eventEmitter";

export default () => {
  return {
    logger,
    eventReminderQueue,
    addEventReminderToQueue,
    eventEmitter,
  };
};