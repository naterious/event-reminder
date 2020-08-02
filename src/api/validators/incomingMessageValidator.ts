import { Command } from "../../core/types";
import { IApiDependencies } from "..";
import { IncomingMessageValidator } from "./types";

export default (
  dependencies: IApiDependencies,
): IncomingMessageValidator => (msg) => {
  let message;
  try {
    message = JSON.parse(msg);
  } catch {
    dependencies.logger.error("Did not receive valid json string");
    return;
  }

  if (message.command == null) {
    dependencies.logger.warn("No command given");
    return;
  }

  if (message.command === Command.SET_EVENT_REMINDER) {
    if (message.name == null) {
      dependencies.logger.warn("No name set for event");
      return;
    }

    if (message.notificationTimeSeconds == null) {
      dependencies.logger.warn("No time set for event");
      return;
    }

    return message;
  }

  return message;
};