export interface IAppMessage {
  timestamp: number;
  type: "error" | "success";
  message: string;
}
