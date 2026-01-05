import * as fs from 'fs';
import { DynamoDB } from 'aws-sdk';

const region = process.env.AWS_REGION || 'ap-northeast-2';

const dynamoDB = new DynamoDB.DocumentClient({ region });

const backupTable = async (tableName: string, outputFile: string) => {
  let lastEvaluatedKey: DynamoDB.DocumentClient.Key | undefined = undefined;
  const allItems: DynamoDB.DocumentClient.ItemList = [];

  console.log(`Starting backup for table: ${tableName}`);

  do {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
      ExclusiveStartKey: lastEvaluatedKey,
    };

    try {
      const result = await dynamoDB.scan(params).promise();
      if (result.Items) {
        allItems.push(...result.Items);
      }
      lastEvaluatedKey = result.LastEvaluatedKey;
    } catch (error) {
      console.error(`Error scanning table: ${error.message}`);
      return;
    }
  } while (lastEvaluatedKey);

  // Write the items to a JSON file
  fs.writeFileSync(outputFile, JSON.stringify({ Items: allItems }, null, 2));
  console.log(`Backup completed. Data saved to ${outputFile}`);
};

// Example usage
const tableName = process.argv[2]; // Pass table name as a command-line argument
const outputFile = process.argv[3] || `${tableName}-backup.json`; // Optional output file name

if (!tableName) {
  console.error('Please provide a DynamoDB table name as the first argument.');
  process.exit(1);
}

backupTable(tableName, outputFile).catch((error) => {
  console.error(`Backup failed: ${error.message}`);
});
