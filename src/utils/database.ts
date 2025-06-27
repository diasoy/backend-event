import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

// Connection cache for serverless environments
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const connect = async () => {
  // Validate DATABASE_URL
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "db-acara",
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      retryWrites: true,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Database connected successfully!");
    return "Database connected!";
  } catch (error) {
    cached.promise = null;
    console.error("Database connection failed:", error);
    throw error;
  }
};

export default connect;
