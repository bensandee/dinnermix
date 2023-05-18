import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI == null) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (cached === undefined) {
  cached = global.mongoose = { conn: undefined, promise: undefined };
}

export const dbConnect = async () => {
  if (cached.conn !== undefined) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connectFunction();
  }

  let conn: mongoose.Mongoose;
  try {
    conn = await cached.promise;
    console.log(`connecting to ${MONGODB_URI}`);
    cached.conn = conn;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  return conn;
};

const connectFunction = () => {
  const opts = {
    bufferCommands: false,
  };
  return mongoose.connect(MONGODB_URI, opts);
};
