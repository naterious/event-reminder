import winston from "winston";
import { Logger } from "../../core/contracts";

export const logger: Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new (winston.transports.Console)(),
  ],
});