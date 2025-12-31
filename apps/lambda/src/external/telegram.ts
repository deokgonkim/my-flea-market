import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN || 'no-token-configured';

export class TelegramService {
  private bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(token, {
      polling: false,
    });
  }

  public async sendMessage(chatId: number, text: string) {
    return this.bot.sendMessage(chatId, text);
  }
}

export const telegramService = new TelegramService();
