// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://skooltymuganda:nrGZqTUnTdeihvUP@cluster0.csgexo3.mongodb.net/cardSystem";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

let cached: { conn: any; promise: any } = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
export default dbConnect;
