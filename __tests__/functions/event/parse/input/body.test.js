import faker from 'faker';

import withInput from '@functions/event/parse/input';

describe('$input', () => {
  describe('#body', () => {
    const body = faker.random.words();

    const request = { body };

    const input = withInput(request);

    it('should return the raw body', () => {
      expect(input.body).toMatch(body);
    });
  });
});
