/* eslint-disable import/no-unresolved */

import validate from '@functions/message/validate';

import faker from 'faker';

describe('#validate', () => {
  describe('when a schema is valid', () => {
    const data = {
      channel: faker.random.word(),
      message: faker.random.words(),
    };

    it('resolves with the correct object', () =>
      expect(validate(data)).resolves.toMatchObject(data));
  });

  describe('when a schema is invalid', () => {
    it('rejects on empty schema', () =>
      expect(validate({})).rejects.toEqual(expect.any(Error)));
  });
});
