# Meet Tai

![Tai][tai]

Tai can send **any** [CloudWatch Event](http://docs.aws.amazon.com/AmazonCloudWatch/latest/events/EventTypes.html) to **any** Slack channel. Styled & formatted in a way that works for you, using template logic to completely transform the original event.

Here's an example:

![CodeBuild Notification][codebuild-example]

## Requirements

* A [Slack Bot Application](https://my.slack.com/services/new/bot)

### How does it work?

Firstly, all _"events of interest"_ **can** be setup in CloudFormation.

This is all made possible with AWS [input transformers](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-events-rule-inputtransformer.html) for CloudWatch Event rule targets. _In plain English,_ when AWS Events are triggered the original event payload is transformed, before being forwarded onto a target, in this case a Lambda Function.

Once the function is invoked with the transformed event payload, a template is rendered using [Apache Velocity](http://velocity.apache.org/engine/1.7/user-guide.html#what-is-velocity) and then afterwards parsed from JSON and sent directly to the Slack API.

> **Velocity Templates?**
> Similar to defining integration request and responses in AWS API Gateway, templates are rendered to well-formed JSON objects ready for parsing and sending to the Slack API.

The Lambda function is expected to be invoked with the following payload. The JSON schema can be found [here](/functions/event/validate/schema.js). _Therefore, any principal invoking this function can send payloads of messages to Slack._

```json
{
  "Body": "object",
  "Context": "object",
  "Template": "base64 encoded string"
}
```

###### `"Body"` Key
An object, mapping keys and any arbitrary values (including nested objects!) from the original AWS Event Payload. Every CloudWatch event has a subtly different payload, so it's useful to use the documentation found [here](http://docs.aws.amazon.com/AmazonCloudWatch/latest/events/EventTypes.html).

###### `"Context"` Key
Any additional key-values in the form `{ "Key": "Value" }`, which should be made available to the template, which would not available from the transformed CloudWatch event payload.

_For example, the `"Context"` key is useful for providing the name of the channel to send messages to, which wouldn't be available from the event itself._

###### `"Template"` Key
A base 64 encoded string, representing the Apache Velocity template to be rendered, parsed and sent to the Slack API.

The template **must** render a valid JSON object string _(ie. `"{ ... }"`)_ and validate against the [JSON schema defined here](/functions/message/validate/schema.js).

For more information about the content of the template key, refer to the [Slack API PostMessage](https://api.slack.com/methods/chat.postMessage) action.

### An Example

In the following example, we build a new `AWS::Events::Rule` resource in a CloudFormation template using an inline input template, which will trigger for [Parameter Store](http://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html) key changes and post them to the `#general` Slack channel.

```yaml
Resources:

  ParameterStoreEvent:
    Type: AWS::Events::Rule
    Properties:
      # Define the pattern matching strategy required to trigger for *all* AWS
      # SSM parameter store events
      EventPattern:
        source:
          - "aws.ssm"
        detail-type:
          - "Parameter Store Change"
        detail:
          # This list is exhaustive so not necessarily required, but useful for
          # the purpose of this example!
          operation:
            - Create
            - Update
            - Delete
      Targets:
          # Any arbitrary Id can be used to identify this target and more than
          # one target can be specified!
        - Id: SendToSlack
          # Import the value from the already deployed event notifier function.
          Arn: !ImportValue EventNotifierFunctionArn
          InputTransformer:
            # Determine which objects from the raw payload we are interested in.
            InputPathsMap:
              detail: "$.detail"
            # The input template allows us to combine the template, with the
            # input mappings that we specified immediately above. This input
            # template will be passed directly to our lambda function.
            #
            # You'll notice that it also allows the usage of parameters
            # directly from CloudFormation, inside the context key.
            InputTemplate: !Sub
              - >
                {
                  "Body": {
                    "detail": <detail>
                  },
                  "Template": "${Template}",
                  "Context": {
                    "title": "Parameter Store Notification",
                    "region": "${AWS::Region}",
                    "channel": "general"
                  }
                }
              # The template is simply substituted in, using Fn::Sub. It
              # must be Base64 encoded in-order to avoid problems with naively
              # injecting JSON into JSON. It has a minimum length of 1 and a
              # maximum character length of 8192.
              - Template: !Base64 >
                #set($type = $input.path('$.type'))
                #set($detail = $input.path('$.detail'))
                {
                  "channel": "$context.channel",
                  "attachments": [{
                    "author_name": "Parameter Store",
                    #if ($status == 'Create' || $status == 'Update')
                    "color": "good",
                    #else
                    "color": "danger",
                    #end
                    "text": "$detail.operation Parameter: '$detail.name' ($detail.type)"
                  }]
                }
```

### A better example

Inline input templates are useful for one-off events. However, for events of interest from CodePipeline, CodeBuild or CloudFormation, you may need to frequently re-use these templates. Fortunately, as most templates are below 4kb and the template is stored as a base64 encoded string, we can place them into Parameter Store itself, eliminating bloat and improving the re-usability of notification templates.

Below is an example, demonstrating the use of a template which exists in Parameter Store and is shared amongst event rules:

```yaml
Parameters:

  NotificationTemplate:
    Type: AWS::SSM::Parameter::Value<String>
    Default: "/Templates/ParameterStoreEvent"

Resources:

  ParameterStoreEvent:
    Type: AWS::Events::Rule
    Properties:
      # Define the pattern matching strategy required to trigger for *all* AWS
      # SSM parameter store events
      EventPattern:
        source:
          - "aws.ssm"
        detail-type:
          - "Parameter Store Change"
      Targets:
        - Id: SendToSlack
          Arn: !ImportValue EventNotifierFunctionArn
          InputTransformer:
            InputPathsMap:
              detail: "$.detail"
            InputTemplate: !Sub
              - >
                {
                  "Body": {
                    "detail": <detail>
                  },
                  "Template": "${Template}",
                  "Context": {
                    "title": "Parameter Store Notification",
                    "region": "${AWS::Region}",
                    "channel": "general"
                  }
                }
              - Template: !Ref NotificationTemplate
```

---

[tai]: /.github/images/tai.png
[codebuild-example]: /.github/images/codebuild-example.png
