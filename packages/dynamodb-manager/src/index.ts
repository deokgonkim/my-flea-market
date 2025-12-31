import {
  DynamoDBClient,
  CreateTableCommand,
  DeleteTableCommand,
  DescribeTableCommand,
  TableStatus,
  waitUntilTableExists,
  waitUntilTableNotExists,
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// Basic DynamoDB table manager
export class DynamoDBManager {
  private client: DynamoDBClient;
  private docClient: DynamoDBDocumentClient;

  constructor(region: string) {
    this.client = new DynamoDBClient({ region });
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  /**
   * Creates a DynamoDB table if it does not exist.
   * @param tableName The name of the table to create.
   * @param keySchema The key schema for the table.
   * @param attributeDefinitions The attribute definitions for the table.
   * @param provisionedThroughput The provisioned throughput for the table.
   */
  async createTable(
    tableName: string,
    keySchema: any[],
    attributeDefinitions: any[],
    billingMode: 'PROVISIONED' | 'PAY_PER_REQUEST' = 'PROVISIONED',
    provisionedThroughput: any = { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    globalSecondaryIndexes?: any[]
  ) {
    try {
      const params: any = {
        TableName: tableName,
        KeySchema: keySchema,
        AttributeDefinitions: attributeDefinitions,
        BillingMode: billingMode,
        GlobalSecondaryIndexes: globalSecondaryIndexes,
      };

      if (billingMode === 'PROVISIONED') {
        params.ProvisionedThroughput = provisionedThroughput;
      } else {
        // For PAY_PER_REQUEST, ProvisionedThroughput should not be specified.
        // Also remove it from GSIs if they exist.
        if (params.GlobalSecondaryIndexes) {
          params.GlobalSecondaryIndexes.forEach((gsi: any) => {
            delete gsi.ProvisionedThroughput;
          });
        }
      }

      const command = new CreateTableCommand(params);
      await this.client.send(command);
      console.log(`Table '${tableName}' creation initiated with ${billingMode} billing.`);
      await waitUntilTableExists({ client: this.client, maxWaitTime: 60 }, { TableName: tableName });
      console.log(`Table '${tableName}' created successfully.`);
    } catch (error: any) {
      if (error.name === 'ResourceInUseException') {
        console.log(`Table '${tableName}' already exists.`);
      } else {
        console.error(`Error creating table '${tableName}':`, error);
        throw error;
      }
    }
  }

  /**
   * Deletes a DynamoDB table.
   * @param tableName The name of the table to delete.
   */
  async deleteTable(tableName: string) {
    try {
      await this.client.send(new DeleteTableCommand({ TableName: tableName }));
      console.log(`Table '${tableName}' deletion initiated.`);
      await waitUntilTableNotExists({ client: this.client, maxWaitTime: 60 }, { TableName: tableName });
      console.log(`Table '${tableName}' deleted successfully.`);
    } catch (error: any) {
      if (error.name === 'ResourceNotFoundException') {
        console.log(`Table '${tableName}' does not exist.`);
      } else {
        console.error(`Error deleting table '${tableName}':`, error);
        throw error;
      }
    }
  }

  /**
   * Describes a DynamoDB table.
   * @param tableName The name of the table to describe.
   */
  async describeTable(tableName: string) {
    try {
      const { Table } = await this.client.send(
        new DescribeTableCommand({ TableName: tableName })
      );
      if (Table) {
        console.log(`Table '${tableName}' description:`, Table);
        return Table;
      } else {
        console.log(`Table '${tableName}' not found.`);
        return null;
      }
    } catch (error) {
      console.error(`Error describing table '${tableName}':`, error);
      throw error;
    }
  }

  async tableExists(tableName: string): Promise<boolean> {
    try {
      const table = await this.describeTable(tableName);
      return table?.TableStatus === TableStatus.ACTIVE;
    } catch {
      return false;
    }
  }
}
