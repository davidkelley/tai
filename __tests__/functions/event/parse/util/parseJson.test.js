import faker from 'faker';

import util from '@functions/event/parse/util';

describe('$util', () => {
  describe('#parseJson', () => {
    const obj = { [faker.random.uuid()]: faker.random.words() };

    const str = JSON.stringify(obj);

    it('parses the contents of a JSON string', () => {
      expect(util.parseJson(str)).toMatchObject(obj);
    });
  });
});
