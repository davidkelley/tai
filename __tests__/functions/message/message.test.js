import Message from '@functions/message';

import fs from 'fs';
import faker from 'faker';
import nock from 'nock';

describe('Message#post', () => {
  describe('when the payload is valid', () => {
    describe('when the payload contains a message', () => {
      const response = fs.readFileSync(`${__dirname}/../__fixtures__/postMessage.json`, 'utf8');

      beforeEach(() => nock(process.env.SLACK_API_URL)
        .post(/chat\.postMessage/)
        .reply(200, JSON.parse(response)));

      const payload = {
        channel: 'davek-temp',
        // message: faker.random.words(),
        attachments: [
          {
            text: 'test',
            color: 'good',
          },
        ],
      };

      fit('returns the correct response from Slack', () =>
        expect(Message.post(payload)).resolves.toEqual(expect.any(Object)));
    });
  });

  describe('when slack returns an error', () => {
    describe('when the payload contains a message', () => {
      beforeEach(() => nock(process.env.SLACK_API_URL)
        .post(/chat\.postMessage/)
        .reply(500, {}));

      const payload = {
        channel: 'davek-temp',
        message: faker.random.words(),
      };

      it('rejects with an error', () =>
        expect(Message.post(payload)).rejects.toEqual(expect.any(Error)));
    });
  });

  describe('when the payload is invalid', () => {
    const payload = {
      [faker.random.uuid()]: faker.random.words(),
    };

    it('rejects with an error', () =>
      expect(Message.post(payload)).rejects.toEqual(expect.any(Error)));
  });
});
