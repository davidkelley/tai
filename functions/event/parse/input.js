import jsonpath from 'jsonpath';

export default function (request) {
  const input = {
    /**
     * Returns the raw payload as a string.
     *
     * @return [string] the raw input body as a string
     */
    body: request.body,

    /**
     * Takes a JSONPath expression string (x) and returns an object representation
     * of the result. This allows you to access and manipulate elements of the
     * payload natively in Apache Velocity Template Language (VTL).
     *
     * For example, `$input.path('$.pets').size()`
     *
     * For more information about JSONPath, see JSONPath or JSONPath for Java.
     *
     * @see http://velocity.apache.org/engine/devel/vtl-reference-guide.html
     * @see http://goessner.net/articles/JsonPath/
     * @see https://github.com/jayway/JsonPath
     *
     * @param [string] path - the JSONPath to lookup
     *
     * @return [object] the object represented under a particular JSONPath.
     */
    path: path => jsonpath.value(JSON.parse(request.body), path),

    /**
     * This function evaluates a JSONPath expression and returns the results as a JSON string.
     *
     * For example, $input.json('$.pets') will return a JSON string representing the pets structure.
     *
     * For more information about JSONPath, see JSONPath or JSONPath for Java.
     *
     * @param [string] path - the JSONPath to return as a stringified JSON object
     *
     * @return [string] the object value under the JSONPath specified
     */
    json: path => JSON.stringify(input.path(path)),
  };
  return input;
}
