import mongoose, { ConnectOptions } from "mongoose";
import { Octavia } from "../bot/structures/Octavia";
mongoose.set("strictQuery", true);

interface MongooseConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export class Database {
  private client: Octavia;
  constructor(client: Octavia) {
    this.client = client;
  }

  async start(): Promise<void> {
    try {
      const mongooseOptions: MongooseConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      await mongoose.connect(process.env.MONGO_URL, mongooseOptions);

      this.client.logger.database(`Mongoose has been connected.`)

    } catch (err) {
      console.log(`Erro:\n${err}`);
    }
  }
}