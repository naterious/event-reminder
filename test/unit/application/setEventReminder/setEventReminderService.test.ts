import {expect} from "chai";
import sinon from "sinon";
import casual from "casual";

import * as infrastructure from "../../../../src/infrastructure/scheduler";

import composeSetEventReminderService from "../../../../src/application/setEventReminder/setEventReminderService";
import { AddEventReminderToQueue, IEventDetails, SetEventReminderService } from "../../../../src/core/contracts";

describe("Application - setEventReminderService", () => {
  let setEventReminderService: SetEventReminderService;
  let addEventReminderToQueue: sinon.SinonStubbedMember<AddEventReminderToQueue>;
  let eventDetails: IEventDetails;

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  beforeEach(() => {
    addEventReminderToQueue = sinon.stub(infrastructure, "addEventReminderToQueue");

    setEventReminderService = composeSetEventReminderService({
      addEventReminderToQueue,
    } as any);

    eventDetails = {
      name: casual.string,
      notificationTimeSeconds: casual.unix_time,
    };
  });

  afterEach(() => sinon.restore());

  describe("When the provided time is in the future", () => {
    it("add the event reminder to the queue with delayed execution", async () => {
      eventDetails = {
        name: casual.string,
        notificationTimeSeconds: currentTimeInSeconds + 10000,
      };

      addEventReminderToQueue.resolves(null);

      setEventReminderService(eventDetails);
      const args = addEventReminderToQueue.args[0];

      expect(addEventReminderToQueue.called).to.be.eql(true);
      expect(args[0].name).to.be.eql(eventDetails.name);
      expect(args[0].delay).to.be.greaterThan(0);
    });
  });

  describe("When the provided time is in the past", () => {
    it("adds the event reminder to the queue for immediate execution", async () => {
      eventDetails = {
        name: casual.string,
        notificationTimeSeconds: currentTimeInSeconds - 1000,
      };

      addEventReminderToQueue.resolves(null);

      setEventReminderService(eventDetails);
      const args = addEventReminderToQueue.args[0];

      expect(addEventReminderToQueue.called).to.be.eql(true);
      expect(args[0].name).to.be.eql(eventDetails.name);
      expect(args[0].delay).to.eql(0);
    });
  });
});