import { myTelegramUserManager } from "@repo/models";
import { itemService, telegramWebhookService } from "@repo/service";
import { telegramService, TelegramUpdate } from "@repo/telegram";
import { alwaysSuccessHandler } from "./base-handler";

export const handler = alwaysSuccessHandler(async (event: any) => {
  const telegramUpdate: TelegramUpdate = JSON.parse(event.body);
  console.log("Received Telegram update:", JSON.stringify(telegramUpdate, null, 2));
  await telegramWebhookService.recordWebhookMessage(telegramUpdate);

  if (telegramUpdate.callback_query?.data) {
    console.log("Callback query data:", telegramUpdate.callback_query.data);
    let text = "Action received.";

    const command = telegramUpdate.callback_query.data?.split(",")?.[0] || '';
    if (command === 'unsubscribe') {
      const slug = telegramUpdate.callback_query.data?.split(",")?.[1] || '';
      console.log("Unsubscribe slug from callback query:", slug);
      if (slug && telegramUpdate.callback_query.from?.id) {
        await itemService.unsubscribeItem(slug, {
          type: 'telegram',
          telegramUserId: telegramUpdate.callback_query.from?.id,
        });
        text = `You have been unsubscribed from updates for item "${slug}"`;
      } else {
        console.log(`Missing slug or telegram user id for unsubscribe. updateId: ${telegramUpdate.update_id}, slug: "${slug}", telegramUserId: "${telegramUpdate.callback_query.from?.id}"`);
      }
    }

    const callbackQueryId = telegramUpdate.callback_query.id;
    const showAlert = true;
    await telegramService.answerCallbackQuery(callbackQueryId, text, showAlert);
    return {
      message: "Callback query received.",
    }
  }

  // const telegramUserId = telegramUpdate?.message?.from?.id;
  const entities = telegramUpdate?.message?.entities;
  if (entities) {
    for (const entity of entities) {
      if (entity.type === "bot_command") {
        const command = telegramUpdate.message.text.slice(
          entity.offset,
          entity.offset + entity.length
        );
        console.log("Command:", command);
        if (command == "/start") {
          // retrieve userId and orderId from the command
          // the value is base64 encoded
          const decodedValue = Buffer.from(
            telegramUpdate.message.text.slice(
              entity.offset + entity.length + 1
            ),
            "base64"
          ).toString();
          const value = decodedValue?.split(",");
          const command = value?.[0];
          const slug = value?.[1];
          console.log("command:", command);
          console.log("slug:", slug);
          await myTelegramUserManager.addOrUpdateTelegramUser(telegramUpdate.message.from);
          if (slug) {
            await itemService.subscribeItem(slug, {
              type: 'telegram',
              telegramUserId: telegramUpdate.message.from.id,
              telegramUsername: telegramUpdate.message.from.username,
            });
          }
          await telegramService.sendMessage(
            telegramUpdate.message.chat.id,
            "When something happens, I will notify you!"
          );
        } else if (command == '/subscribe') {
          const slug = telegramUpdate.message.text.slice(
            entity.offset + entity.length + 1
          ).trim();
          console.log("Subscribe slug:", slug);
          if (slug) {
            await itemService.subscribeItem(slug, {
              type: 'telegram',
              telegramUserId: telegramUpdate.message.from.id,
              telegramUsername: telegramUpdate.message.from.username,
            });
          }
        } else if (command == '/unsubscribe') {
          const slug = telegramUpdate.message.text.slice(
            entity.offset + entity.length + 1
          ).trim();
          console.log("Unsubscribe slug:", slug);
          if (slug) {
            await itemService.unsubscribeItem(slug, {
              type: 'telegram',
              telegramUserId: telegramUpdate.message.from.id,
            });
          }
        }
      }
    }
  }

  return {
    message: "Telegram webhook processed successfully.",
  }
});
