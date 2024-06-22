import { NestFactory } from "@nestjs/core";
import * as dotenv from "dotenv";
import { WinstonModule } from "nest-winston";
import helemet from "helmet";
import * as cors from "cors";
import { winstonLogger } from "./core/logger";
import { AppModule } from "./app.module";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: winstonLogger }),
  });

  app.use([helemet(), cors({ origin: "http://localhost:3001", exposedHeaders: ["X-Refresh-Token"] })]);

  await app.listen(8081);
}
bootstrap();
