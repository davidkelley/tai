import faker from 'faker';

import util from '@functions/event/parse/util';

describe('$util', () => {
  describe('#base64Decode', () => {
    const str = faker.random.words();

    const encoded = Buffer.from(str).toString('base64');

    it('properly decodes base64', () => {
      expect(util.base64Decode(encoded)).toMatch(str);
    });
  });
});
