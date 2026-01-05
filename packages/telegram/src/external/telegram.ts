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

  public escapeMarkdownV2(text: string): string {
    return String(text).replace(/([_*[\]()~`>#+-=|{}.!])/g, '\\$1');
  }

  public async sendMessage(chatId: number, text: string, escape: boolean = true) {
    return this.bot.sendMessage(chatId, escape ? this.escapeMarkdownV2(text) : text, {
      parse_mode: 'MarkdownV2',
    });
  }
}

export const telegramService = new TelegramService();
