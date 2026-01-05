
export interface DDBStreamMessage {
  eventName: 'INSERT' | 'MODIFY' | 'REMOVE';
  dynamodb: {
    Keys: { [key: string]: any };
    NewImage?: { [key: string]: any };
    OldImage?: { [key: string]: any };
  };
}

export const dynamodbValueToNative = (ddbValue: any): any => {
  if ('S' in ddbValue) {
    return ddbValue.S;
  } else if ('N' in ddbValue) {
    return Number(ddbValue.N);
  } else if ('BOOL' in ddbValue) {
    return ddbValue.BOOL;
  } else if ('NULL' in ddbValue) {
    return null;
  } else if ('M' in ddbValue) {
    const obj: { [key: string]: any } = {};
    for (const key in ddbValue.M) {
      obj[key] = dynamodbValueToNative(ddbValue.M[key]);
    }
    return obj;
  } else if ('L' in ddbValue) {
    return ddbValue.L.map((item: any) => dynamodbValueToNative(item));
  }
  return ddbValue;
}

export const findUpdateAttributes = (message: DDBStreamMessage): { [key: string]: { oldValue: any; newValue: any } } => {
  if (message.eventName !== 'MODIFY' || !message.dynamodb.NewImage || !message.dynamodb.OldImage) {
    return {};
  }

  const newImage = message.dynamodb.NewImage;
  const oldImage = message.dynamodb.OldImage;
  const updatedAttributes: { [key: string]: { oldValue: any; newValue: any } } = {};

  for (const key of Object.keys(newImage)) {
    if (JSON.stringify(newImage[key]) !== JSON.stringify(oldImage[key])) {
      updatedAttributes[key] = {
        oldValue: dynamodbValueToNative(oldImage[key]),
        newValue: dynamodbValueToNative(newImage[key])
      }
    }
  }

  return updatedAttributes;
}
