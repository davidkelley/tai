import parse from './parse';
import validate from './validate';
import Message from '../message';

import Logger from '../logger';

export async function handler(event, _, cb) {
  try {
    const { Template, Body: body, Context: context } = await validate(event);
    const template = Buffer.from(Template, 'base64').toString('utf8');
    const input = JSON.stringify(body);
    const payload = await parse(template, { input, context });
    const response = await Message.post(payload);
    cb(null, response);
  } catch (err) {
    Logger.error(err);
    cb(err);
  }
}
