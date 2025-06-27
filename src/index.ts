import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes/api";

import db from "./utils/database";
import docs from "./docs/route";
import errorMiddleware from "./middlewares/error.middleware";
import { PORT } from "./utils/env";

// Create Express app
const app = express();

// Database connection flag
let dbConnected = false;

async function initializeApp() {
  if (!dbConnected) {
    try {
      const result = await db();
      console.log("Database status: ", result);
      dbConnected = true;
    } catch (error) {
      console.error("Database connection error:", error);
      throw error;
    }
  }

  // CORS configuration with production URLs
  app.use(
    cors({
      origin: [
        "http://localhost:3001", 
        "http://localhost:3000",
        "https://frontend-event.vercel.app",
        "https://fe-acara.vercel.app",
        /^https:\/\/.*\.vercel\.app$/,
        process.env.CLIENT_HOST || "http://localhost:3001"
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  
  app.use(bodyParser.json());

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
    await initializeApp();
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
    await initializeApp();
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

// Start server if running locally (not in Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  startServer();
}
