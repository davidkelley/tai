import faker from 'faker';

import util from '@functions/event/parse/util';

describe('$util', () => {
  describe('#parseJson', () => {
    const url = `${faker.internet.url()}/?${faker.random.uuid()}=${faker.random.words()}`;

    it('encodes the content of an unsafe url string', () => {
      expect(util.urlEncode(url)).toMatch(/(%[0-9][A-Z0-9])+/g);
    });
  });
});
