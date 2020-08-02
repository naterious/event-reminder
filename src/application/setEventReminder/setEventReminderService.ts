import { SetEventReminderService } from "../../core/contracts";
import { IApplicationDependencies } from "..";

export default (
  dependencies: IApplicationDependencies,
): SetEventReminderService => (eventDetails) => {
  const targetTime = eventDetails.notificationTimeSeconds * 1000;
  const currentTime = Date.now();

  let eventReminderDelay = 0;

  const delay = targetTime - currentTime;

  if (delay > 0) {
    eventReminderDelay = delay;
  }

  return dependencies.addEventReminderToQueue({
    name: eventDetails.name,
    delay: eventReminderDelay,
  });
};