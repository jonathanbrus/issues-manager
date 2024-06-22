import { ObjectId } from "mongodb";

export interface ITicket {
  _id: ObjectId;
  referenceNo: string;
  userId: string;
  userType: "customer" | "merchant" | "super-admin";
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in-progress" | "resolved" | "closed";
  attachments?: string[];
  assignment?: {
    assignedBy: string;
    assignedTo: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
