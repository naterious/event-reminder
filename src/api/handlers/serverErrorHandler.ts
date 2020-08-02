import { IHandlerDependencies } from ".";
import { ServerErrorHandler } from "./types";

export default (dependencies: IHandlerDependencies): ServerErrorHandler => (err) => {
  dependencies.logger.warn(`Client disconnected - reason: ${err}`);
};