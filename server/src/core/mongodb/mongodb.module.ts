import { Module } from "@nestjs/common";
import { MongoDB } from "./mongodb.service";

@Module({ providers: [MongoDB] })
export class MongodbModule {}
