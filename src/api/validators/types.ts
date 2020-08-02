import { IMessage } from "../../core/types";

export type IncomingMessageValidator = (msg: string) => IMessage;