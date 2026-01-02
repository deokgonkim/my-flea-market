export const handler = async (event: any) => {
  console.log('Noop handler received event:', event);
  console.log('update test notifier');

  return {
    message: 'No operation performed.',
  };
};
