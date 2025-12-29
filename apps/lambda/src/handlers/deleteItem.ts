import { APIGatewayProxyEvent } from 'aws-lambda';
import { NotFoundError, wrapHandler } from "./base-handler";
import { itemService } from '../services/item-service';

export const handler = wrapHandler(async (event: APIGatewayProxyEvent) => {

  const slug = event.pathParameters?.slug;

  if (!slug) {
    return {
      statusCode: 400,
      body: { message: 'Slug parameter is required' },
    };
  }

  const item = await itemService.getItemBySlug(slug);

  if (item) {
    await itemService.deleteItem(item.id);
  } else {
    throw new NotFoundError(`Item ${slug} not found`);
  }

  return {
    message: "Item deleted successfully",
  };
});
