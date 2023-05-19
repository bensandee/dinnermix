import mongoose, { Model, Schema } from "mongoose";

/** Helper for use with nextjs that builds model only if necessary. This prevents memory leaks during development hotswap reloads. */
export const buildModel = <T>(
  name: string,
  schema: Schema
): Model<Omit<T, "id">> => {
  return mongoose.models[name] ?? mongoose.model(name, schema);
};
