import util from '@functions/event/parse/util';

describe('$util', () => {
  describe('#escapeJavaScript', () => {
    const unescaped = "',;.%*#(&@(*))'";

    it('properly escapes strings', () => {
      expect(util.escapeJavaScript(unescaped)).toMatch(/\\'/);
    });
  });
});
