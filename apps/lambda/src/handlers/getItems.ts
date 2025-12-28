import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Sample Lambda handler for getting items
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    // Sample data - in a real application, this would come from a database
    const items = [
      {
        id: '1',
        name: 'Vintage Camera',
        price: 150,
        description: 'Classic film camera in excellent condition',
      },
      {
        id: '2',
        name: 'Antique Clock',
        price: 250,
        description: 'Beautiful wooden clock from the 1920s',
      },
      {
        id: '3',
        name: 'Retro Gaming Console',
        price: 80,
        description: 'Working condition with original controllers',
      },
    ];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      },
      body: JSON.stringify({
        message: 'Successfully retrieved items',
        items,
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
