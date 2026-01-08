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
    const escapedMessage = escape ? this.escapeMarkdownV2(text) : text;
    return this.bot.sendMessage(chatId, escapedMessage, {
      parse_mode: 'MarkdownV2',
    }).catch((error) => {
      console.error('Error sending Telegram message:', error);
      console.log('Failed message:', text);
      console.log('escaped message:', escapedMessage);
      throw error;
    });
  }

  public async sendReply(chatId: number, text: string, reply_markup: any) {
    return this.bot.sendMessage(chatId, text, {
      parse_mode: 'MarkdownV2',
      reply_markup,
    }).catch((error) => {
      console.error('Error sending Telegram reply message:', error);
      console.log('Failed message:', text);
      throw error;
    });
  }

  public async answerCallbackQuery(callbackQueryId: string, text: string, showAlert: boolean = false) {
    return this.bot.answerCallbackQuery(callbackQueryId, {
      text,
      show_alert: showAlert,
    }).catch((error) => {
      console.error('Error answering Telegram callback query:', error);
      console.log('Callback Query ID:', callbackQueryId);
      console.log('Answer text:', text);
      throw error;
    });
  }
}

export const telegramService = new TelegramService();
