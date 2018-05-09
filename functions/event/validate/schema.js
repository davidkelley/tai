/**
 * The JSON Schema (Draft-4) required for events to validate against
 *
 * @type {Object}
 */
const Schema = {
  type: 'object',
  required: [
    'Template',
  ],
  properties: {
    Body: {
      type: 'object',
    },
    Context: {
      type: 'object',
    },
    Template: {
      type: 'string',
    },
  },
};

export default Schema;
