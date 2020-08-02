import { Command } from "../../core/types";
import { IEventDetails } from "../../core/contracts";
import { IHandlerDependencies } from ".";
import { IncomingMessageHandler } from "./types";

export default (
  dependencies: IHandlerDependencies,
): IncomingMessageHandler => (webSocket) => (msg) => {
  const message = dependencies.incomingMessageValidator(msg);

  if (message == null) {
    return;
  }

  if (message.command === Command.SET_EVENT_REMINDER) {
    dependencies.setEventReminderService(message as IEventDetails);
    return webSocket.send(`Reminder for event ${message.name} saved`);
  }

  dependencies.logger.warn("Received unknown command");
};
