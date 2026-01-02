export const handler = async (event: any) => {
  console.log('Noop handler received event:', event);

  return {
    message: 'No operation performed.',
  };
};
