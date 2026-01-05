import { telegramService } from "@repo/telegram";
import { telegramUserService } from "@repo/service";

export const handler = async (event: any) => {
  console.log('Notifier handler received event:', event);

  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const message = body.Message;
    
    const adminUsers = await telegramUserService.getAdminUsers();
    for (const user of adminUsers) {
      await telegramService.sendMessage(user.telegramUserId, message);
    }
    console.log('Received message:', message);
  }

  return {
    message: 'No operation performed.',
  };
};
