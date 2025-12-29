import { APIGatewayProxyEvent } from 'aws-lambda';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Item } from '@repo/models';
import { BadRequestError, NotFoundError, validateRequestBody, wrapHandler } from "./base-handler";
import { itemService } from '../services/item-service';

export class UpdateItemDto implements Partial<Omit<Item, 'id'>> {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsNumber()
  price?: number;
  @IsOptional()
  @IsString()
  slug?: string;
}

export const handler = wrapHandler(async (event: APIGatewayProxyEvent) => {
  const slug = event.pathParameters?.slug;
  if (!slug) {
    throw new BadRequestError('Slug parameter is required');
  }

  const item = await itemService.getItemBySlug(slug);
  if (!item) {
    throw new NotFoundError(`Item with slug '${slug}' not found`);
  }

  const requestBody: Partial<Item> = await validateRequestBody(event.body, UpdateItemDto);
  
  const newItem = await itemService.updateItem(item.id, requestBody);

  return newItem;
});
