import { IHandlerDependencies } from ".";
import { ServerErrorHandler } from "./types";

export default (dependencies: IHandlerDependencies): ServerErrorHandler => (err) => {
  dependencies.logger.warn(`Server caught an error: ${err}`);
};