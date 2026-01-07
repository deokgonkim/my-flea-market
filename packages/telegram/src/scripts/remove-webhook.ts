
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export const main = async () => {
  const result = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?remove`, {
    method: 'POST',
  });
  const data = await result.json();
  console.log(JSON.stringify(data, null, 2));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
