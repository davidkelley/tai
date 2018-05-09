import parse from '@functions/event/parse';

import faker from 'faker';

describe('parse()', () => {
  describe('when parameters are valid', () => {
    describe('when no input or context is provided', () => {
      const key = faker.random.uuid();

      const value = faker.random.words();

      const template = `
      {
        "${key}": "${value}"
      }
      `;

      it('returns the correct value', () =>
        expect(parse(template, {})).resolves.toEqual(expect.objectContaining({
          [key]: value,
        })));
    });

    describe('when input and context are provided', () => {
      const key = faker.random.uuid();

      const value = faker.random.words();

      const input = JSON.stringify({ value });

      const context = { [key]: faker.random.number() };

      const template = `
      {
        "${key}": "$input.path('$.value')",
        "ctx": $context['${key}']
      }
      `;

      it('returns the correct value', async () => {
        const obj = await parse(template, { input, context });
        expect(obj).toEqual(expect.objectContaining({
          [key]: value,
          ctx: context[key],
        }));
      });
    });
  });


  describe('when parameters are invalid', () => {
    it('throws an error', () => {
      expect(() => parse({})).toThrow(Error);
    });
  });
});
