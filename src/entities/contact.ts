export type Message = {
  textMessage: string;
  sender: string;
};

export class Contact {
  private messages: Message[] = [];
  readonly id = Date.now();

  // eslint-disable-next-line no-unused-vars
  constructor(public readonly phone: string) {}

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  getMessages(): Message[] {
    return this.messages;
  }

  getChatId(): string {
    return this.phone + '@c.us';
  }
}
