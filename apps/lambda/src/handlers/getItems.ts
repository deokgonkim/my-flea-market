import { APIGatewayProxyEvent } from 'aws-lambda';
import { itemService } from '../services/item-service';
import { wrapHandler } from './base-handler';

/**
 * Sample Lambda handler for getting items
 */
export const handler = wrapHandler(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (event: APIGatewayProxyEvent) => {
    const items = await itemService.getItems();

    return items;
  }
);
