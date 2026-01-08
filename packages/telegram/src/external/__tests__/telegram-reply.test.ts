import { describe, it, expect, beforeEach } from 'vitest';
import { TelegramService } from '../telegram';

const TEST_RECEIVER = process.env.TEST_TELEGRAM_RECEIVER_ID || '0';

describe('TelegramService', () => {
  beforeEach(() => {
  });

  it('test sending reply', async () => {
    const service = new TelegramService();
    const result = await service.sendReply(Number(TEST_RECEIVER), "Choose an option:", {
      "inline_keyboard": [
        [
          { "text": "/subscribe a", "callback_data": "a" },
          { "text": "/unsubscribe b", "callback_data": "b" }
        ],
        [
          { "text": "/manage", "callback_data": "c" }
        ]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    });
    expect(result).toBeDefined();
    console.log('Message Result:', result);
  }, 20000);
});
