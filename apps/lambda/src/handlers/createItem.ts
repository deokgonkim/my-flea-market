import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface CreateItemRequest {
  name: string;
  price: number;
  description: string;
}

/**
 * Sample Lambda handler for creating a new item
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: 'Request body is required',
        }),
      };
    }

    const requestBody: CreateItemRequest = JSON.parse(event.body);

    // Validate required fields
    if (!requestBody.name || !requestBody.price || !requestBody.description) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: 'Missing required fields: name, price, description',
        }),
      };
    }

    // In a real application, this would save to a database
    const newItem = {
      id: Math.random().toString(36).substring(7),
      ...requestBody,
      createdAt: new Date().toISOString(),
    };

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      },
      body: JSON.stringify({
        message: 'Item created successfully',
        item: newItem,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
