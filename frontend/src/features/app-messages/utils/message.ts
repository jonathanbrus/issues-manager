export class AppMessage {
  id;
  message;
  type;
  constructor({ type, message }: { type: "error" | "success"; message: string }) {
    this.id = Date.now();
    this.message = message;
    this.type = type;
  }

  get = () => {
    return { id: this.id, message: this.message, type: this.type };
  };
}
