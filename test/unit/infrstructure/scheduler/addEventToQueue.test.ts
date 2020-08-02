import {expect} from "chai";
import sinon from "sinon";
import casual from "casual";

import * as infrastructure from "../../../../src/infrastructure/scheduler";

import { IEventReminderDetails, AddEventReminderToQueue } from "../../../../src/core/contracts";

describe("Infrastructure - addEventReminderToQueue", () => {
  let addEventReminderToQueue: AddEventReminderToQueue;
  let eventReminderQueue: sinon.SinonStubbedMember<any>;
  let eventDetails: IEventReminderDetails;

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  beforeEach(() => {
    addEventReminderToQueue = infrastructure.addEventReminderToQueue;
    eventReminderQueue = sinon.stub(infrastructure.eventReminderQueue, "add");

    eventDetails = {
      name: casual.string,
      delay: casual.unix_time,
    };
  });

  afterEach(() => sinon.restore());

  describe("When a valid name and delay are passed", () => {
    it("add the event reminder to the queue with delayed execution", async () => {
      eventDetails = {
        name: casual.string,
        delay: currentTimeInSeconds + 10000,
      };

      eventReminderQueue.resolves(null);

      addEventReminderToQueue(eventDetails);
      const args = eventReminderQueue.args[0];

      expect(eventReminderQueue.called).to.be.eql(true);
      expect(args[0]).to.be.eql(eventDetails.name);
      expect(args[1]).to.be.eql({name: eventDetails.name});
      expect(args[2]).to.be.eql({delay: eventDetails.delay, removeOnComplete: true});
    });
  });
});