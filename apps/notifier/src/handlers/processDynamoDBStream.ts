import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const region = process.env.AWS_REGION || 'ap-northeast-2';

const snsClient = new SNSClient({ region });

const sendSnsMessage = async (message: string) => {
  return snsClient.send(new PublishCommand({
    Message: message,
    TopicArn: process.env.SNS_TOPIC_ARN,
  }));
}

export const handler = async (event: any) => {
  console.log('ProcessDynamoDBStream handler received event:', JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    console.log('Processing record:', JSON.stringify(record, null, 2));

    await sendSnsMessage(JSON.stringify(record, null, 2));
  }

  return {
    message: 'DynamoDB stream processed.',
  };
};
