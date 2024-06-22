import { Module } from "@nestjs/common";
import { TicketsModule } from "./services/tickets/ticket.module";
import { MongodbModule } from "./core/mongodb/mongodb.module";

@Module({
  imports: [MongodbModule, TicketsModule],
  providers: [],
})
export class AppModule {}
