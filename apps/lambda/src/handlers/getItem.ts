import { APIGatewayProxyEvent } from 'aws-lambda';
import { itemService } from '../services/item-service';
import { BadRequestError, NotFoundError, wrapHandler } from './base-handler';

export const handler = wrapHandler(async (event: APIGatewayProxyEvent) => {
  const slug = event.pathParameters?.slug;
  if (!slug) {
    throw new BadRequestError('Slug parameter is required');
  }

  const item = await itemService.getItemBySlug(slug);

  if (!item) {
    throw new NotFoundError(`Item '${slug}' not found`);
  }

  return item;
});

