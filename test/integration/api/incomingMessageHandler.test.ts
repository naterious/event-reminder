import WebSocket from "ws";
import { expect } from "chai";
import sinon from "sinon";

import * as infrastructure from "../../../src/infrastructure/logger/logger";

describe("Api - incomingMessageHandler", () => {
  let loggerStub: any;
  let wsClient: WebSocket;

  beforeEach(() => {
    loggerStub = sinon.stub(infrastructure.logger);
    wsClient = new WebSocket(`ws://localhost:${process.env.APPLICATION_PORT}`);
    return;
  });

  afterEach(() => {
    wsClient.close();
    sinon.restore();
  });

  describe("When an event reminder is successfully set", () => {
    it("Responds with message to confirm it", (done) => {
      wsClient.on("open", () => {
        wsClient.send(JSON.stringify({
          command: "setEventReminder",
          name: "tester",
          notificationTimeSeconds: 0
        }));
  
        wsClient.on("message", (data) => {
          expect(data).to.be.a("string");
          expect(data).to.be.equal("Reminder for event tester saved");
          done();
        });
      });
    });
  });

  describe("When a message with correct command but without name is sent", () => {
    it("Does not respond, but logs the action", (done) => {
      wsClient.on("open", () => {
        wsClient.send(JSON.stringify({
          command: "setEventReminder",
          notificationTimeSeconds: 1596278550
        }));        

        expect(loggerStub._eventsCount).to.be.greaterThan(1);
        done();
      });
    });
  });

  describe("When a message with correct command but without notificationTimeSeconds is sent", () => {
    it("Does not respond, but logs the action", (done) => {
      wsClient.on("open", () => {
        wsClient.send(JSON.stringify({
          command: "setEventReminder",
          name: "newEvent"
        }));        

        expect(loggerStub._eventsCount).to.be.greaterThan(1);
        done();
      });
    });
  });

  describe("When a message without command is sent", () => {
    it("Does not respond, but logs the action", (done) => {
      wsClient.on("open", () => {
        wsClient.send(JSON.stringify({
          notificationTimeSeconds: 1596278550
        }));        

        expect(loggerStub._eventsCount).to.be.greaterThan(1);
        done();
      });
    });
  });

  describe("When an invalid json string is sent", () => {
    it("Does not respond, but logs the action", (done) => {
      wsClient.on("open", () => {
        wsClient.send(JSON.stringify({
          notificationTimeSeconds: 1596278550,
        }));        

        expect(loggerStub._eventsCount).to.be.greaterThan(1);
        done();
      });
    });
  });
});