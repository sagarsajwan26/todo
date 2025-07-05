// db.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_DB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGO_DB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Optional: reduce server selection timeout for faster errors in serverless
      serverSelectionTimeoutMS: 5000,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
