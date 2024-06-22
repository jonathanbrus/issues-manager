import { Injectable } from "@nestjs/common";
import { MongoClient, Db, Collection } from "mongodb";
import { CollectionNames, dbCollections } from "./db-collections";
import { winstonLogger } from "../logger";

@Injectable()
export class MongoDB {
  public mongoClient: MongoClient;

  async connect(): Promise<void> {
    try {
      winstonLogger.info("Connecting to mongodb atlas cluster");

      this.mongoClient = new MongoClient(process.env.MONGO_STRING + process.env.MONGO_DB);

      const database = this.mongoClient.db(process.env.MONGO_DB);

      winstonLogger.info("Successfully connected to mongodb atlas cluster\n");

      await this.initializeCollections(database);

      await this.initializeIndexes(database);
    } catch (error) {
      winstonLogger.error("Failed to connect to mongodb atlas cluster", error);
    }
  }

  async initializeCollections(database: Db) {
    try {
      winstonLogger.info("Initializing db collections\n");

      const existingCollections = (await database.listCollections().toArray()).map(({ name }) => name);

      Object.keys(dbCollections).forEach((collectionName) => {
        if (!existingCollections.includes(collectionName)) {
          database.createCollection(collectionName);
        }
      });

      winstonLogger.info("Successfully initialized db collections\n");
    } catch (error) {
      winstonLogger.error("Failed to initialize db collections\n", error);
    }
  }

  async initializeIndexes(database: Db) {
    try {
      winstonLogger.info("Initializing db indexes\n");

      winstonLogger.info(database.databaseName + "\n");

      winstonLogger.info("Successfully initialized db indexes\n");
    } catch (error) {
      winstonLogger.error("Failed to initialize db indexes\n", error);
    }
  }

  async getDBCollection<T = Collection>(collectionName: CollectionNames): Promise<T> {
    try {
      winstonLogger.info(`Getting db collection ${collectionName}\n`);

      if (!this.mongoClient) return;

      await this.mongoClient.connect();

      const collection = this.mongoClient.db(process.env.MONGODB_SOURCE).collection(collectionName) as T;

      return collection;
    } catch (error) {
      winstonLogger.error(`Failed to get db collection ${collectionName}\n`, error);
    }
  }
}
