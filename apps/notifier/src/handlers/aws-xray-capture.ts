import AWSXRay, { Subsegment } from 'aws-xray-sdk-core';
AWSXRay.enableAutomaticMode(); // Not sure if this is necessary here


export const wrapper = (handler: (event: unknown) => Promise<void>) => {
  return async (event: unknown): Promise<void> => {
    await AWSXRay.captureAsyncFunc(handler.name, async (subsegment?: Subsegment) => {
      try {
        const result = await handler(event);
        if (subsegment) {
          subsegment.close();
        }
        return result;
      } catch (error) {
        console.error('Error captured in wrapper:', error);
        if (subsegment) {
          subsegment.addError(error as Error);
          subsegment.close();
        }
      }
    });
  }
}
