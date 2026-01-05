import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN || 'no-token-configured';

export class TelegramService {
  private bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(token, {
      polling: false,
      /* customize agent to force IPv4, to avoid issues in Local environment */
      /* normally, `request` option is not needed */
      request: {
        url: 'https://api.telegram.org',
        agentOptions: {
          family: 4,
        }
      }
    });
  }

  public async sendMessage(chatId: number, text: string) {
    return this.bot.sendMessage(chatId, text);
  }
}

export const telegramService = new TelegramService();
