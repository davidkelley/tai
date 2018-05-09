import faker from 'faker';

import withInput from '@functions/event/parse/input';

describe('$input', () => {
  describe('#path', () => {
    it('should be a function', () => {
      const body = { [faker.random.uuid()]: faker.random.words() };

      const request = { body: JSON.stringify(body) };

      const input = withInput(request);

      expect(input.path).toEqual(expect.any(Function));
    });

    describe('when the path is an array', () => {
      const counting = [1, 2, 3, 4, 5];

      const body = JSON.stringify({ numbers: { counting } });

      const input = withInput({ body });

      const path = '$.numbers.counting';

      it('should return the array', () => {
        expect(input.path(path)).toEqual(counting);
      });
    });

    describe('when the path is a value', () => {
      const value = faker.random.words();

      const body = JSON.stringify({ path: { to: { a: { value } } } });

      const input = withInput({ body });

      const path = '$.path.to.a.value';

      it('should return the correct value', () => {
        expect(input.path(path)).toEqual(value);
      });
    });

    describe('when the path is an object', () => {
      const obj = { [faker.random.uuid()]: faker.random.words() };

      const body = JSON.stringify({ path: { to: { an: { obj } } } });

      const input = withInput({ body });

      const path = '$.path.to.an.obj';

      it('should return the correct object', () => {
        expect(input.path(path)).toEqual(obj);
      });
    });
  });
});
