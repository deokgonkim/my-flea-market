import { APIGatewayProxyEvent } from 'aws-lambda';
import { itemService } from '../services/item-service';
import { wrapHandler } from './base-handler';
import { ItemStatus } from '@repo/models';

const randomStatus = () => {
  const statuses = [ItemStatus.Listed, ItemStatus.Reserved, ItemStatus.Sold];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

/**
 * Sample Lambda handler for getting items
 */
export const handler = wrapHandler(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (event: APIGatewayProxyEvent) => {
    const items = await itemService.getItems();

    // TODO implement tags, status
    return items.map((e) => {
      return {
        ...e,
        status: e.status ?? randomStatus(),
        tags: e.tags ?? ['no tag']
      }
    })
  }
);
