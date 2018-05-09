import faker from 'faker';

import util from '@functions/event/parse/util';

describe('$util', () => {
  describe('#parseJson', () => {
    const url = `${faker.internet.url()}/?${faker.random.uuid()}=${faker.random.words()}`;

    const encoded = encodeURIComponent(url);

    it('decodes the content of an unsafe url string', () => {
      expect(util.urlDecode(encoded)).toMatch(url);
    });
  });
});
