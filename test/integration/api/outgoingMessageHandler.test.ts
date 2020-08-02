import WebSocket from "ws";
import { expect } from "chai";

describe("Api - outgoingMessageHandler", function() {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  let wsClient: WebSocket;

  beforeEach(() => {
    wsClient = new WebSocket(`ws://localhost:${process.env.APPLICATION_PORT}`);
    return;
  });

  afterEach(() => {
    wsClient.close();
  });

  describe("When an event reminder is successfully returned after time is reached", () => {

    before(() => {
      const wsClientTwp = new WebSocket(`ws://localhost:${process.env.APPLICATION_PORT}`);
      wsClientTwp.on("open", () => {
        wsClientTwp.send(JSON.stringify({
          command: "setEventReminder",
          name: "tester",
          notificationTimeSeconds: currentTimeInSeconds + 2,
        }));
        wsClientTwp.on("message", () => ({}));
      });
    });

    it("Sends event to connected clients", (done) => {
      wsClient.on("open", () => {
        wsClient.once("message", (data) => {

          expect(data).to.be.a("string");
          expect(data).to.be.equal("tester");
          
          done();
        });
      });
    });
  });
});