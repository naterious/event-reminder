import { EventEmitter } from "events";

import composeIncomingMessageHandler from "./incomingMessageHandler";
import composeOutgoingMessageHandler from "./outgoingMessageHandler";
import composeServerErrorHandler from "./serverErrorHandler";

import { SetEventReminderService, Logger } from "../../core/contracts";
import { IncomingMessageValidator } from "../validators/types";

export interface IHandlerDependencies {
  incomingMessageValidator: IncomingMessageValidator;
  setEventReminderService: SetEventReminderService;
  logger: Logger;
  eventEmitter: EventEmitter
}

export default (dependencies: IHandlerDependencies) => {
  const incomingMessageHandler = composeIncomingMessageHandler(dependencies);
  const outgoingMessageHandler = composeOutgoingMessageHandler(dependencies);
  const serverErrorHandler = composeServerErrorHandler(dependencies);

  return {
    incomingMessageHandler,
    outgoingMessageHandler,
    serverErrorHandler,
  };
};