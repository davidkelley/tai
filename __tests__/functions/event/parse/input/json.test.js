import faker from 'faker';

import withInput from '@functions/event/parse/input';

describe('$input', () => {
  describe('#json', () => {
    it('should be a function', () => {
      const body = { [faker.random.uuid()]: faker.random.words() };
      const request = { body: JSON.stringify(body) };
      const input = withInput(request);
      expect(input.json).toEqual(expect.any(Function));
    });

    describe('when the path is an array', () => {
      const counting = [1, 2, 3, 4, 5];

      const body = JSON.stringify({ numbers: { counting } });

      const input = withInput({ body });

      const path = '$.numbers.counting';

      const str = JSON.stringify(counting);

      it('should return the array', () => {
        expect(input.json(path)).toEqual(str);
      });
    });

    describe('when the path is a value', () => {
      const value = faker.random.words();

      const body = JSON.stringify({ path: { to: { a: { value } } } });

      const input = withInput({ body });

      const path = '$.path.to.a.value';

      const str = JSON.stringify(value);

      it('should return the correct value', () => {
        expect(input.json(path)).toEqual(str);
      });
    });

    describe('when the path is an object', () => {
      const obj = { [faker.random.uuid()]: faker.random.words() };

      const body = JSON.stringify({ path: { to: { an: { obj } } } });

      const input = withInput({ body });

      const path = '$.path.to.an.obj';

      const str = JSON.stringify(obj);

      it('should return the correct object', () => {
        expect(input.json(path)).toEqual(str);
      });
    });
  });
});
