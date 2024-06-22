import { Module, Logger } from "@nestjs/common";
import { AdminsTicketsControllers, UsersTicketsControllers } from "./ticket.controller";
import { TicketsService } from "./ticket.service";
import { MongoDB } from "src/core/mongodb/mongodb.service";

@Module({
  controllers: [AdminsTicketsControllers, UsersTicketsControllers],
  providers: [TicketsService, MongoDB, Logger],
})
export class TicketsModule {}
