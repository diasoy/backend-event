"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./routes/api"));
const database_1 = __importDefault(require("./utils/database"));
const route_1 = __importDefault(require("./docs/route"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const env_1 = require("./utils/env");
// Create Express app
const app = (0, express_1.default)();
// Database connection flag
let dbConnected = false;
function initializeApp() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!dbConnected) {
            try {
                const result = yield (0, database_1.default)();
                console.log("Database status: ", result);
                dbConnected = true;
            }
            catch (error) {
                console.error("Database connection error:", error);
                throw error;
            }
        }
        // CORS configuration with production URLs
        app.use((0, cors_1.default)({
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
        }));
        app.use(body_parser_1.default.json());
        app.get("/", (req, res) => {
            res.status(200).json({
                message: "Server is running",
                data: null,
                timestamp: new Date().toISOString(),
            });
        });
        app.use("/api", api_1.default);
        (0, route_1.default)(app);
        app.use(error_middleware_1.default.serverRoute());
        app.use(error_middleware_1.default.serverError());
        return app;
    });
}
// For local development
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield initializeApp();
            app.listen(env_1.PORT, () => {
                console.log(`Server is running on http://localhost:${env_1.PORT}`);
            });
        }
        catch (error) {
            console.error("Failed to start server:", error);
            process.exit(1);
        }
    });
}
// Export for Vercel serverless deployment
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield initializeApp();
            return app(req, res);
        }
        catch (error) {
            console.error("Handler error:", error);
            return res.status(500).json({
                error: "Internal server error",
                message: error instanceof Error ? error.message : "Unknown error"
            });
        }
    });
}
exports.default = handler;
// Start server if running locally (not in Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    startServer();
}
