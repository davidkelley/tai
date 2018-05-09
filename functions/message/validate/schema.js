/**
 * The JSON Schema (Draft-4) required for events to validate against, in-order to send
 * formatted, pretty messages to Slack.
 *
 * @type {Object}
 */
const Schema = {
  type: 'object',
  required: [
    'channel',
  ],
  anyOf: [
    {
      required: [
        'message',
      ],
    },
    {
      required: [
        'attachments',
      ],
    },
  ],
  properties: {
    channel: {
      type: 'string',
    },
    message: {
      type: 'string',
      default: '',
    },
    attachments: {
      type: 'array',
      minItems: 1,
      maxItems: 20,
      items: {
        type: 'object',
        properties: {
          fallback: {
            type: 'string',
          },
          color: {
            type: 'string',
          },
          pretext: {
            type: 'string',
          },
          author_name: {
            type: 'string',
          },
          author_link: {
            type: 'string',
            pattern: '^https?:',
          },
          author_icon: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          title_link: {
            type: 'string',
            pattern: '^https?:',
          },
          text: {
            type: 'string',
          },
          fields: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                },
                value: {
                  type: 'string',
                },
                short: {
                  type: 'boolean',
                },
              },
            },
          },
          image_url: {
            type: 'string',
            pattern: '^https?:',
          },
          thumb_url: {
            type: 'string',
            pattern: '^https?:',
          },
          footer: {
            type: 'string',
          },
          footer_icon: {
            type: 'string',
          },
          ts: {
            type: 'number',
          },
        },
      },
    },
  },
};

export default Schema;
