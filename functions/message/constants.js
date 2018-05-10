/**
 * The Bot API Token which will be used to communicate with Slack
 *
 * @type {String}
 */
export const BOT_TOKEN = (process.env.BOT_TOKEN || 'development');

/**
 * The human-recognisable username of the Bot inside Slack.
 *
 * @type {String}
 */
export const BOT_USERNAME = (process.env.BOT_USERNAME || 'Sparkle');

/**
 * The avatar/icon for the Bot inside Slack.
 *
 * @type {String}
 */
export const BOT_ICON = (process.env.BOT_ICON || ':+1:');
