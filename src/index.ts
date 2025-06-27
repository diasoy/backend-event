import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes/api";

import db from "./utils/database";
import docs from "./docs/route";
import errorMiddleware from "./middlewares/error.middleware";
import { PORT } from "./utils/env";

// Database connection cache for serverless
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const result = await db();
    console.log("Database status: ", result);
    cachedDb = result;
    return result;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

function createApp() {
  const app = express();

  // CORS configuration with production URLs
  app.use(
    cors({
      origin: [
        "http://localhost:3001",
        "http://localhost:3000",
        "https://frontend-event.vercel.app",
        "https://fe-acara.vercel.app",
        "https://frontend-event-tawny.vercel.app/",
        /^https:\/\/.*\.vercel\.app$/,
        process.env.CLIENT_HOST || "http://localhost:3001",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Server is running",
      data: null,
      timestamp: new Date().toISOString(),
    });
  });

  app.use("/api", router);
  docs(app);

  app.use(errorMiddleware.serverRoute());
  app.use(errorMiddleware.serverError());

  return app;
}

// For local development
async function startServer() {
  try {
    await connectToDatabase();
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Export for Vercel serverless deployment
export default async function handler(req: any, res: any) {
  try {
    // Ensure database connection
    await connectToDatabase();

    // Create new app instance for each request (serverless best practice)
    const app = createApp();

    // Handle the request
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Start server if running locally (not in Vercel)
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  startServer();
}
