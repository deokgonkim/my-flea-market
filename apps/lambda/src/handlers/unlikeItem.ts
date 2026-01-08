import { APIGatewayProxyEvent } from 'aws-lambda';
import { itemService } from '@repo/service';
import { BadRequestError, NotFoundError, wrapHandler } from './base-handler';
// import { telegramService } from '@repo/telegram';
// import { telegramUserService } from '@repo/service';

export const handler = wrapHandler(async (event: APIGatewayProxyEvent) => {
  const slug = event.pathParameters?.slug;
  if (!slug) {
    throw new BadRequestError('Slug parameter is required');
  }
  console.log("Unliking item with slug:", slug);

  const item = await itemService.getItemBySlug(slug);

  if (!item) {
    throw new NotFoundError(`Item '${slug}' not found`);
  }

  const newItem = await itemService.unlikeItem(item.id);
  // const adminUsers = await telegramUserService.getAdminUsers();
  // for (const user of adminUsers) {
  //   await telegramService.sendMessage(user.telegramUserId, `Item unliked: ${item.name} (Slug: ${item.slug})`);
  // }

  return newItem;
});

