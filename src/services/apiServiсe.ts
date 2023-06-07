import axios, { AxiosResponse } from 'axios';

export type MessageResponse = {
  idMessage: string;
};

export type MessageJSON = {
  chatId: string;
  message: string;
};

const HOST_URL = 'https://api.green-api.com';

export class ApiService {
  private static idInstance: string;
  private static apiTokenInstance: string;
  private static readonly TYPE_MESSAGE_WEBHOOK = 'incomingMessageReceived';

  static async authorize(
    idInstance: string,
    apiTokenInstance: string,
  ): Promise<boolean> {
    ApiService.idInstance = idInstance;
    ApiService.apiTokenInstance = apiTokenInstance;

    return await axios
      .get(
        `${HOST_URL}/waInstance${idInstance}/getStatusInstance/${apiTokenInstance}`,
      )
      .then((response) => response.data.statusInstance === 'online')
      .catch((_e) => {
        return false;
      });
  }

  static isAuthorized(): boolean {
    return !!ApiService.idInstance && !!ApiService.apiTokenInstance;
  }

  static async sendMessage(
    message: MessageJSON,
  ): Promise<AxiosResponse<MessageResponse>> {
    return await axios.post<MessageResponse>(
      `${HOST_URL}/waInstance${ApiService.idInstance}/SendMessage/${ApiService.apiTokenInstance}`,
      JSON.stringify(message),
    );
  }

  static async fetchMessages(): Promise<MessageJSON[]> {
    const messages: MessageJSON[] = [];
    const fetchRecursively = async () => {
      const notification = await ApiService.fetchNotification();

      if (!notification.data) {
        return;
      }
      if (ApiService.isTypeMessage(notification)) {
        messages.push({
          chatId: notification.data.body.senderData.sender,
          message:
            notification.data.body.messageData.textMessageData?.textMessage ||
            notification.data.body.messageData.extendedTextMessageData?.text,
        });
      }
      await ApiService.deleteNotification(notification.data.receiptId);
      await fetchRecursively();
    };

    await fetchRecursively();
    return messages;
  }

  static async fetchNotification() {
    const response = await axios.get(
      `${HOST_URL}/waInstance${ApiService.idInstance}/ReceiveNotification/${ApiService.apiTokenInstance}`,
    );
    return response;
  }

  static async deleteNotification(receiptId: string) {
    return await axios.delete(
      `${HOST_URL}/waInstance${ApiService.idInstance}/DeleteNotification/${ApiService.apiTokenInstance}/${receiptId}`,
    );
  }

  private static isTypeMessage(notification: any) {
    return (
      notification.data.body.typeWebhook === ApiService.TYPE_MESSAGE_WEBHOOK
    );
  }
}
