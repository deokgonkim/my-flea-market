import { telegramService } from "@repo/telegram";
import { itemService, telegramUserService } from "@repo/service";
import { DDBStreamMessage, findUpdateAttributes } from "../streamParser";
import { Item } from "@repo/models";

const createTemplate = (strings: TemplateStringsArray, ...keys: any[]) => {
  return (args: { [key: string]: any }) => {
    let result = strings[0];
    keys.forEach((key, i) => {
      result += args[key] + strings[i + 1];
    });
    return result;
  };
}

const notificationMessageTemplate = createTemplate`
*${'name'} has been updated*
${'updatedAttributes'}
View [${'slug'}](${'WEB_BASE_URL'}/item/${'slug'})
`;

const formatUpdatedAttributes = (updatedColumns: { [key: string]: { oldValue: any; newValue: any } }): string => {
  let formatted = '';
  for (const [key, value] of Object.entries(updatedColumns)) {
    formatted += `• *${key}*: ${telegramService.escapeMarkdownV2(value?.oldValue)} → ${telegramService.escapeMarkdownV2(value?.newValue)}\n`;
  }
  return formatted;

}

export const handler = async (event: any) => {
  console.log('Notifier handler received event:', event);

  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const rawMessage = body.Message;

    const parsedMessage: DDBStreamMessage = JSON.parse(rawMessage);

    const updatedColumns = findUpdateAttributes(parsedMessage);

    let message = 'An item has been added.';
    if (Object.keys(updatedColumns).length > 0) {
      const item: Item | null = await itemService.getItem(parsedMessage.dynamodb.Keys.id.S);
      message = notificationMessageTemplate({
        WEB_BASE_URL: process.env.WEB_BASE_URL || 'http://localhost:3000',
        name: telegramService.escapeMarkdownV2(item?.name || 'Unknown'),
        slug: telegramService.escapeMarkdownV2(item?.slug || 'unknown'),
        updatedAttributes: formatUpdatedAttributes(updatedColumns),
      });
    }
    
    const adminUsers = await telegramUserService.getAdminUsers();
    for (const user of adminUsers) {
      await telegramService.sendMessage(user.telegramUserId, message, false);
    }
    console.log('Received message:', message);
  }

  return {
    message: 'No operation performed.',
  };
};
