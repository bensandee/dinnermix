import { Mongoose } from "mongoose";

type MongooseConnection = {
  promise?: Promise<Mongoose>;
  conn?: Mongoose;
};

declare global {
  // eslint-disable-next-line no-unused-vars
  var mongoose: MongooseConnection;
}
