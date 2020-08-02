import { EventEmitter } from "events";

import composeServer from "./server";
import composeValidators from "./validators";
import composeHandlers from "./handlers";

import { Logger, SetEventReminderService } from "../core/contracts";

export interface IApiDependencies {
  logger: Logger;
  setEventReminderService: SetEventReminderService;
  eventEmitter: EventEmitter;
}

export default (dependencies: IApiDependencies) => {
  const validators = composeValidators(dependencies);
  const handlers = composeHandlers({
    ...dependencies,
    ...validators,
  });
  const server = composeServer({
    ...dependencies,
    ...handlers,
  });

  return {
    server,
  };
};