/* eslint-disable no-extend-native */

import escape from 'js-string-escape';

String.prototype.replaceAll = function replaceAll(search, replacement) {
  const target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

export default {
  /**
   * Escapes the characters in a string using JavaScript string rules.
   *
   * @param {string} str - the string to escape
   *
   * @return {string} the escaped string.
   */
  escapeJavaScript: str => escape(str),
  /**
   * Takes "stringified" JSON and returns an object representation of the
   * result. You can use the result from this function to access and manipulate
   * elements of the payload natively in Apache Velocity Template Language
   * (VTL).
   *
   * @param {string} str - the JSON string to attempt to parse
   *
   * @return {object} the parsed JSON object
   */
  parseJson: str => JSON.parse(str),

  /**
   * Converts a string into "application/x-www-form-urlencoded" format.
   *
   * @param {string} str - the string to be encoded
   *
   * @return {string} the URL encoded string
   */
  urlEncode: str => encodeURIComponent(str),

  /**
   * Decodes an "application/x-www-form-urlencoded" string.
   *
   * @param {string} str - the string to decode
   *
   * @return {string} a decoded www form
   */
  urlDecode: str => decodeURIComponent(str),

  /**
   * Encodes the data into a base64-encoded string.
   *
   * @param {string} str - the string to encode into base64 format
   *
   * @return {string} the base64 encoded string
   */
  base64Encode: str => Buffer.from(str.toString()).toString('base64'),

  /**
   * Decodes the data from a base64-encoded string.
   *
   * @param {string} str - a base64 encoded string
   *
   * @return {string} the decoded string
   */
  base64Decode: str => Buffer.from(str, 'base64').toString('ascii'),

  /**
   * Transforms a recognisable time, such as an ISO8601 formatted string
   * into a Javascript epoch timestamp.
   *
   * @param {string} a formatted timestamp
   *
   * @return {number} an epoch timestamp
   */
  epochTime: time => new Date(time).getTime(),

};
