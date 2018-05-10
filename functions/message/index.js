import Slack from 'slack';
import wrappedError from 'error/wrapped';

import * as C from './constants';
import validate from './validate';

/**
 * A slack API client object, initialised with the pre-configured BOT_TOKEN
 * environment variable.
 *
 * @type {Object}
 */
const client = new Slack({ token: C.BOT_TOKEN });

/**
 * An object containing default properties which are sent to
 * Slack upon each request.
 *
 * @type {Object}
 */
const defaults = {
  parse: true,
  username: C.BOT_USERNAME,
  icon_url: C.BOT_ICON,
};

/**
 * An error occurred whilst posting the message to Slack.
 *
 * @type {Error}
 */
const postError = wrappedError({
  message: 'Error posting to Slack',
  type: 'message.slack_error',
});

export default class Message {
  /**
   * Posts a new message to Slack, first validating against the required payload
   * schema. See the README for more information on how to construct events
   * for this method.
   *
   * @param {Object} opts - The JS object with necessary fields to construct
   *  a Slack mesage.
   *
   * @return {Object} the response from Slack.
   */
  static async post(opts) {
    const data = await validate(opts);
    const { channel, message: text, attachments = [] } = data;
    try {
      const params = Object.assign({ channel, text, attachments }, defaults);
      return await client.chat.postMessage(params);
    } catch (err) {
      throw postError(err);
    }
  }
}
