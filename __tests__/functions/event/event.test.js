import { handler as event } from '@functions/event';

import fs from 'fs';
import nock from 'nock';

describe('event()', () => {
  describe('when the payload is valid', () => {
    const response = fs.readFileSync(`${__dirname}/../__fixtures__/postMessage.json`, 'utf8');

    beforeEach(() => nock(process.env.SLACK_API_URL)
      .post(/chat\.postMessage/)
      .reply(200, JSON.parse(response)));

    const template = `
    {
      "channel": "hello",
      "message": "hello world"
    }
    `;

    const payload = {
      Template: Buffer.from(template).toString('base64'),
    };

    it('renders correctly', (done) => {
      event(payload, null, (err, data) => {
        expect(err).toBe(null);
        expect(data).toEqual(expect.any(Object));
        done();
      });
    });
  });
});
