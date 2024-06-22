import { Injectable, Logger } from "@nestjs/common";
import { Collection } from "mongodb";
import { ITicket } from "src/core/interfaces/ticket";
import { MongoDB } from "src/core/mongodb/mongodb.service";
import { convertToObjectId, createdTimestamp, updatedTimestamp } from "src/core/mongodb/utils";

@Injectable()
export class TicketsService {
  dbCollection: Collection = null;
  constructor(
    private readonly mongodb: MongoDB,
    private readonly logger: Logger,
  ) {}

  async initializeDBCollection() {
    await this.mongodb.connect();

    if (!this.dbCollection) {
      this.dbCollection = await this.mongodb.getDBCollection("support_tickets");
    }
  }

  async createTicket(ticketInfo: Partial<ITicket>) {
    try {
      await this.initializeDBCollection();

      const { insertedId } = await this.dbCollection.insertOne({ ...ticketInfo, ...createdTimestamp() });

      const ticketDetails = await this.dbCollection.findOne({ _id: insertedId });

      return ticketDetails;
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }

  async fetchUserTickets(userId: string) {
    try {
      await this.initializeDBCollection();

      const cursor = this.dbCollection.find<ITicket>({ userId: convertToObjectId(userId) });

      const userTickets = await cursor.toArray();

      return userTickets;
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }

  async fetchDashboardTickets(pagination: { pageNo: number; pageSize: number }, agentId?: string) {
    try {
      await this.initializeDBCollection();

      const { pageNo, pageSize } = { pageNo: pagination.pageNo, pageSize: pagination.pageSize };

      const cursor = this.dbCollection.find<ITicket>(
        { ...(agentId && { "assignment.assignedTo": convertToObjectId(agentId) }) },
        { sort: { createdAt: -1 }, skip: (pageNo - 1) * pageSize },
      );
      const userTickets = await cursor.toArray();

      const totalDocuments = await this.dbCollection.countDocuments({
        "assignment.assignedTo": convertToObjectId(agentId),
      });

      const totalPages = Math.ceil(totalDocuments / pageSize);

      return {
        pagination: { totalPages, pageNo: pageNo, pageSize },
        tickets: userTickets,
      };
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }

  async fetchTicketDetails(ticketId: string) {
    try {
      await this.initializeDBCollection();

      const ticketDetails = await this.dbCollection.findOne<ITicket>({ _id: convertToObjectId(ticketId) });

      return ticketDetails;
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }

  async assignAgentToTicket(ticketId: string, agentId: string) {
    try {
      await this.initializeDBCollection();

      const { upsertedId } = await this.dbCollection.updateOne(
        { _id: convertToObjectId(ticketId) },
        { $set: { assignment: { assignedBy: agentId, assignedTo: agentId }, ...updatedTimestamp() } },
      );

      const ticketDetails = await this.dbCollection.findOne({ _id: upsertedId });

      return ticketDetails;
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }

  async processTicket(ticketId: string, ticketInfo: Partial<ITicket>) {
    try {
      await this.initializeDBCollection();

      const { upsertedId } = await this.dbCollection.updateOne(
        { _id: convertToObjectId(ticketId) },
        { $set: { ...ticketInfo, ...updatedTimestamp() } },
      );

      const ticketDetails = await this.dbCollection.findOne({ _id: upsertedId });

      return ticketDetails;
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }

  async closeTicket(ticketId: string) {
    try {
      await this.initializeDBCollection();

      const { upsertedId } = await this.dbCollection.updateOne(
        { _id: convertToObjectId(ticketId) },
        { $set: { status: "closed", ...updatedTimestamp() } },
      );

      const ticketDetails = await this.dbCollection.findOne({ _id: upsertedId });

      return ticketDetails;
    } catch (error) {
      this.logger.error((error as Error).message);
    }
  }
}
