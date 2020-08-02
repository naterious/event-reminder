import { IApplicationDependencies } from "../index";
import { ProcessMessagesService } from "../../core/contracts";

export default (
  dependencies: IApplicationDependencies,
): ProcessMessagesService => () => {
  dependencies.eventReminderQueue.process("*", (job) => {
    const message = job.name;

    dependencies.eventEmitter.emit("messageToClient", message);

    return Promise.resolve();
  });
};
