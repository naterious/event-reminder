import * as WebSocket from "ws";

export type IncomingMessageHandler = (webSocket: WebSocket) => (msg: string) => void;

export type OutgoingMessageHandler = () => void;

export type ServerErrorHandler = (err: Error) => void;