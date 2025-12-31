import { describe, it, expect, beforeEach } from 'vitest';
import { TelegramUser } from '@repo/models';
import { TelegramUserService } from '../telegram-user-service';

const region = process.env.AWS_REGION || 'region-not-set';

describe('TelegramUserService', () => {
  beforeEach(() => {
    console.log('region:', region);
  });

  it('returns admin users with projected ids', async () => {
    const service = new TelegramUserService(region);
    const result = await service.getAdminUsers();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach((user: TelegramUser) => {
      console.log('Admin User:', user);
      expect(user).toHaveProperty('telegramUserId');
      expect(Object.keys(user).length).toBe(1); // Only telegramUserId should be present
    });
  });
});
