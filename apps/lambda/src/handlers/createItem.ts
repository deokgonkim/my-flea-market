import { APIGatewayProxyEvent } from 'aws-lambda';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Item } from '@repo/models';
import { itemService } from '../services/item-service';
import { validateRequestBody, wrapHandler } from './base-handler';

export class CreateItemDto implements Omit<Item, 'id'> {
  @IsString()
  @IsOptional()
  slug!: string;

  @IsString()
  name!: string;
  @IsString()
  description!: string;
  @IsNumber()
  price!: number;
}

/**
 * Sample Lambda handler for creating a new item
 */
export const handler = wrapHandler(async (event: APIGatewayProxyEvent) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: { message: 'Request body is required' },
    };
  }

  const requestBody: CreateItemDto = await validateRequestBody(event.body, CreateItemDto);
  // const requestBody: Omit<Item, 'id'> = JSON.parse(event.body);
  if (!requestBody.slug) {
    requestBody.slug = requestBody.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  const newItem = await itemService.createItem(requestBody);

  return newItem;
});
