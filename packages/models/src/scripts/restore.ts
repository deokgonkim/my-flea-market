import * as fs from 'fs';
import { DynamoDB } from 'aws-sdk';

const region = process.env.AWS_REGION || 'ap-northeast-2';

const dynamoDB = new DynamoDB.DocumentClient({ region });

const restoreTable = async (tableName: string, inputFile: string) => {
  console.log(`Starting restore for table: ${tableName}`);

  const fileContent = fs.readFileSync(inputFile, 'utf-8');
  const { Items } = JSON.parse(fileContent);

  for (const item of Items) {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    };

    try {
      await dynamoDB.put(params).promise();
      console.log(`Restored item: ${JSON.stringify(item)}`);
    } catch (error) {
      console.error(`Error restoring item: ${error.message}`);
    }
  }

  console.log(`Restore completed for table: ${tableName}`);
};

// Example usage
const tableName = process.argv[2]; // Pass table name as a command-line argument
const inputFile = process.argv[3]; // input file name

if (!tableName || !inputFile) {
  console.error('Please provide a DynamoDB table name as the first argument and input file as the second argument.');
  process.exit(1);
}

restoreTable(tableName, inputFile).catch((error) => {
  console.error(`Restore failed: ${error.message}`);
});
