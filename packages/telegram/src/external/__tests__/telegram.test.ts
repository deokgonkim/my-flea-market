import { describe, it, expect, beforeEach } from 'vitest';
import { TelegramService } from '../telegram';

const TEST_RECEIVER = process.env.TEST_TELEGRAM_RECEIVER_ID || '0';

const MARKDOWN_TEST_MESSAGES = [
  `*Bold Text*`,
  `_Italic Text_`,
  `__Underline Text__`,
  `~Strikethrough Text~`,
  `||Spoiler Text||`,
  `\`Inline Code\``,
  `\nmultiline code\nblock\n`,
  `[www\\.dgkim\\.net](https://www.dgkim.net)`,
]

describe('TelegramService', () => {
  beforeEach(() => {
  });

  it('test sending markdown messages', async () => {
    const service = new TelegramService();
    for (const msg of MARKDOWN_TEST_MESSAGES) {
      const result = await service.sendMessage(Number(TEST_RECEIVER), msg, false);

      expect(result).toBeDefined();
      console.log('Message Result:', result);
    }
  }, 20000);
});
