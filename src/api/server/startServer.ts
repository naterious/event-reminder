import * as WebSocket from "ws";
import { Server } from "http";

import { Logger } from "../../core/contracts";
import {
  IncomingMessageHandler,
  ServerErrorHandler,
  OutgoingMessageHandler,
} from "../handlers/types";

export interface IServerDependencies {
  incomingMessageHandler: IncomingMessageHandler;
  serverErrorHandler: ServerErrorHandler;
  outgoingMessageHandler: OutgoingMessageHandler;
  logger: Logger;
}

export let webSocketServer: WebSocket.Server;

export default (dependencies: IServerDependencies) => (server: Server): Server => {
  webSocketServer = new WebSocket.Server({ server });

  webSocketServer.on("connection", (webSocket: WebSocket) => {
    webSocket.on("message", dependencies.incomingMessageHandler(webSocket));
    webSocket.on("error", dependencies.serverErrorHandler);
  });

  dependencies.outgoingMessageHandler();

  dependencies.logger.info(`Server running at port: ${process.env.APPLICATION_PORT}`);

  return server.listen(process.env.APPLICATION_PORT);
};