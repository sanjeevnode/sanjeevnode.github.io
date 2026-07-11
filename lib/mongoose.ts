import { MONGO_URI } from "@/constants/Constants";
import mongoose from "mongoose";

const MONGODB_URI = MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalAny = global as any;
const cached = globalAny.mongoose || (globalAny.mongoose = { conn: null, promise: null });

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // don't cache a failed connection
    throw e;
  }
  return cached.conn;
}
