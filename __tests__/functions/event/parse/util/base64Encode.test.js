import faker from 'faker';

import util from '@functions/event/parse/util';

describe('$util', () => {
  describe('#base64Encode', () => {
    const str = faker.random.words();

    const encoded = Buffer.from(str).toString('base64');

    it('properly encodes base64', () => {
      expect(util.base64Encode(str)).toMatch(encoded);
    });
  });
});
