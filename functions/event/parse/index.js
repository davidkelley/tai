import Velocity from 'velocityjs';
import wrappedError from 'error/wrapped';

import util from './util';
import withInput from './input';

const { Compile } = Velocity;

/**
 * An error was thrown whilst parsing the template.
 *
 * @type {Error}
 */
const renderError = wrappedError({
  message: 'Error parsing input template',
  type: 'event.parser.error',
});

export default async function parse(template, { input = '', context = {} } = {}) {
  try {
    const parsed = Velocity.parse(template);
    const text = new Compile(parsed).render({
      context,
      util,
      input: withInput({ body: input }),
    });
    return JSON.parse(text);
  } catch (err) {
    throw renderError(err);
  }
}
