import { describe, it, expect, beforeEach } from 'vitest';

const TEST_INSERT_RECORD = {
  "eventID": "361ce957fa4e99050b8830d2e2c184bf",
  "eventName": "INSERT",
  "eventVersion": "1.1",
  "eventSource": "aws:dynamodb",
  "awsRegion": "ap-northeast-2",
  "dynamodb": {
    "ApproximateCreationDateTime": 1767595181,
    "Keys": {
      "id": {
        "S": "test"
      }
    },
    "NewImage": {
      "id": {
        "S": "test"
      }
    },
    "SequenceNumber": "372600000951964829459689",
    "SizeBytes": 12,
    "StreamViewType": "NEW_AND_OLD_IMAGES"
  },
  "eventSourceARN": "arn:aws:dynamodb:ap-northeast-2:123456789012:table/my-flea-market-dev-items/stream/2026-01-05T04:45:10.080"
};

const TEST_MODIFY_RECORD = {
  "eventID": "f6534c52b31f217441046fe2ff135e03",
  "eventName": "MODIFY",
  "eventVersion": "1.1",
  "eventSource": "aws:dynamodb",
  "awsRegion": "ap-northeast-2",
  "dynamodb": {
    "ApproximateCreationDateTime": 1767591016,
    "Keys": {
      "id": {
        "S": "1a2d5644-309b-44c8-a783-39e01cd83b70"
      }
    },
    "NewImage": {
      "createdAt": {
        "S": "2025-12-30T08:56:00.757Z"
      },
      "condition": {
        "S": "good"
      },
      "price": {
        "N": "8000"
      },
      "imageUrl": {
        "S": "https://image.dgkim.net/my-flea-market/magic-mouse-grip-holder/image.jpg"
      },
      "name": {
        "S": "Magic Mouse 그립홀더"
      },
      "description": {
        "S": "블라블라 테스트\n하하하"
      },
      "id": {
        "S": "1a2d5644-309b-44c8-a783-39e01cd83b70"
      },
      "productUrl": {
        "S": "https://www.coupang.com/vp/products/7670483848?vendorItemId=87540295774"
      },
      "slug": {
        "S": "magic-mouse-grip-holder2"
      },
      "likes": {
        "N": "40"
      },
      "status": {
        "S": "listed"
      },
      "tags": {
        "L": [
          {
            "S": "peripheral"
          },
          {
            "S": "apple"
          },
          {
            "S": "accessory"
          }
        ]
      }
    },
    "OldImage": {
      "createdAt": {
        "S": "2025-12-30T08:56:00.757Z"
      },
      "condition": {
        "S": "good"
      },
      "price": {
        "N": "8000"
      },
      "imageUrl": {
        "S": "https://image.dgkim.net/my-flea-market/magic-mouse-grip-holder/image.jpg"
      },
      "name": {
        "S": "Magic Mouse 그립홀더"
      },
      "description": {
        "S": "블라블라 테스트\n하하하"
      },
      "id": {
        "S": "1a2d5644-309b-44c8-a783-39e01cd83b70"
      },
      "productUrl": {
        "S": "https://www.coupang.com/vp/products/7670483848?vendorItemId=87540295774"
      },
      "slug": {
        "S": "magic-mouse-grip-holder2"
      },
      "likes": {
        "N": "41"
      },
      "status": {
        "S": "listed"
      },
      "tags": {
        "L": [
          {
            "S": "peripheral"
          },
          {
            "S": "apple"
          },
          {
            "S": "accessory"
          }
        ]
      }
    },
    "SequenceNumber": "148300004333401971306994",
    "SizeBytes": 846,
    "StreamViewType": "NEW_AND_OLD_IMAGES"
  },
  "eventSourceARN": "arn:aws:dynamodb:ap-northeast-2:123456789012:table/my-flea-market-dev-items/stream/2026-01-05T04:45:10.080"
};

describe('DynamoDB Stream Parser', () => {
  it('test INSERT record parsing', async () => {
    const record = TEST_INSERT_RECORD;
    expect(record.eventName).toBe('INSERT');
    const newImage = record.dynamodb.NewImage;
    const itemId = newImage?.id?.S;
    expect(itemId).toBe('test');
  });

  it('test MODIFY record parsing', async () => {
    const record = TEST_MODIFY_RECORD;
    expect(record.eventName).toBe('MODIFY');
    const newImage = record.dynamodb.NewImage;
    const itemId = newImage?.id?.S;
    expect(itemId).toBe('1a2d5644-309b-44c8-a783-39e01cd83b70');
    const likes = newImage?.likes?.N;
    expect(likes).toBe('40');
  });

  it('test findUpdateAttributes function', async () => {
    const { findUpdateAttributes } = await import('../streamParser');
    const updatedAttributes = findUpdateAttributes(TEST_INSERT_RECORD as any);
    console.log('Updated Attributes:', updatedAttributes);
    expect(updatedAttributes.length).toBe(0);
  });

  it('test findUpdateAttributes function', async () => {
    const { findUpdateAttributes } = await import('../streamParser');
    const updatedAttributes = findUpdateAttributes(TEST_MODIFY_RECORD as any);
    console.log('Updated Attributes:', updatedAttributes);
    expect(updatedAttributes).toContain('likes');
    expect(updatedAttributes.length).toBe(1);
  });
});
