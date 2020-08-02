import { webSocketServer } from "../server/startServer";
import { IHandlerDependencies } from ".";
import { OutgoingMessageHandler } from "./types";

export default (dependencies: IHandlerDependencies): OutgoingMessageHandler => () => {
  dependencies.eventEmitter.on("messageToClient", (message) => {
    webSocketServer.clients
      .forEach((client) => {
        client.send(message);
      });
  });
};
