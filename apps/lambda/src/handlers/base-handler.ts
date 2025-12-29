import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from 'class-validator';

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ClientRequestError extends Error {
  public errors: ValidationError[];

  constructor(errors: ValidationError[], message?: string) {
    super(message || 'Validation failed');
    this.errors = errors;
  }
}

/**
 * Base handler to wrap Lambda functions with common logic
 */
export function wrapHandler(fn: (event: APIGatewayProxyEvent) => Promise<any>) {
  return async (event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    console.log('Event:', JSON.stringify(event, null, 2));

    try {
      const result = await fn(event);
      return {
        statusCode: result.statusCode,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        },
        body: JSON.stringify(result, null, 2),
      };
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof BadRequestError || error instanceof NotFoundError) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            message: error.message,
          }, null, 2),
        };
      }
      if (error instanceof ClientRequestError) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            message: 'Validation error',
            errors: error.errors,
          }, null, 2),
        };
      }
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: 'Internal server error',
          error: error instanceof Error ? error.message : 'Unknown error',
        }, null, 2),
      };
    }
  }
}

export const validateRequestBody = async <DtoClass>(body: unknown, DtoConstructor: new () => object): Promise<DtoClass> => {
  const requestBody = JSON.parse(body as string);
  const dto = plainToInstance(DtoConstructor, requestBody);

  const errors = await validate(dto, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  if (errors.length > 0) {
    throw new ClientRequestError(errors, 'Validation failed');
  }
  return requestBody as DtoClass;
}
