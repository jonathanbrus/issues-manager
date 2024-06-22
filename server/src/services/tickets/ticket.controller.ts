import {
  Controller,
  Logger,
  Param,
  Query,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { TicketsService } from "./ticket.service";

@Controller("admins")
export class AdminsTicketsControllers {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly logger: Logger,
  ) {}

  @Get("/support-tickets")
  async fetchDashboardTickets(
    @Query("pagination") pagination: { pageNo: string; pageSize: string },
    @Query("agentId") agentId?: string,
  ) {
    try {
      console.log("hit");
      const result = await this.ticketsService.fetchDashboardTickets(
        { pageNo: Number(pagination.pageNo), pageSize: Number(pagination.pageSize) },
        agentId,
      );

      console.log("hit1");

      return { result };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message || "", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/support-tickets/:ticketId")
  async fetchTicketDetails(@Param("ticketId") ticketId: string) {
    try {
      const result = await this.ticketsService.fetchTicketDetails(ticketId);

      return { result };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message || "", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/support-tickets/:ticketId")
  async assignAgentToTicket(@Param("ticketId") ticketId: string, @Body() agentId: string) {
    try {
      const result = await this.ticketsService.assignAgentToTicket(ticketId, agentId);

      return { result };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message || "", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/support-tickets/:ticketId")
  async processTicket(@Param("ticketId") ticketId: string, @Body() ticketInfo: object) {
    try {
      const result = await this.ticketsService.processTicket(ticketId, ticketInfo);

      return { result };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message || "", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/support-tickets/:ticketId")
  async closeTicket(@Param("ticketId") ticketId: string) {
    try {
      const result = await this.ticketsService.closeTicket(ticketId);

      return { result };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message || "", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

@Controller("users")
export class UsersTicketsControllers {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly logger: Logger,
  ) {}

  @Post("/support-tickets")
  async createTicket(@Body("ticketInfo") ticketInfo: object) {
    try {
      const result = await this.ticketsService.createTicket(ticketInfo);

      return { result };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message || "", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/support-tickets")
  async fetchUserTickets(@Query("userId") userId: string) {
    try {
      const result = await this.ticketsService.fetchUserTickets(userId);

      return { result };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message || "", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
