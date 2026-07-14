import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import next from "next";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import AppError from "./utils/AppError";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import vendorRoutes from "./routes/vendorRoutes";
import prisma from "./lib/prisma";

const dev = env.NODE_ENV !== "production";
const app = next({ dev, turbopack: true });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(async () => {
    const server = express();

    // Security
    server.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
    server.use(helmet({ contentSecurityPolicy: false }));

    // Logging
    server.use(
      morgan("[:date[iso]] :method :url :status :response-time ms - :res[content-length]", {
        skip: (req) => req.url.startsWith("/_next/") || req.url.includes("favicon.ico"),
      }),
    );

    // Rate limiting
    const generalLimiter = rateLimit({
      windowMs: 60 * 1000,
      max: 100,
      message: { success: false, message: "Too many requests, please try again later." },
    });
    const authLimiter = rateLimit({
      windowMs: 60 * 1000,
      max: 20,
      message: { success: false, message: "Too many auth attempts, please try again later." },
    });
    server.use("/api", generalLimiter);
    server.use("/api/auth", authLimiter);

    // Body parsing
    server.use(express.json());
    server.use(cookieParser());

    // Database
    try {
      await prisma.$connect();
      console.log("Prisma connected to the database successfully!");
    } catch (err) {
      console.error("Error connecting to the database with Prisma:", err);
      process.exit(1);
    }

    // Health check
    server.get("/api/health", (_req: Request, res: Response) => {
      res.json({ status: "ok", timestamp: new Date() });
    });

    // API routes
    server.use("/api/users", userRoutes);
    server.use("/api/vendor", vendorRoutes);
    server.use("/api/auth", authRoutes);

    // Next.js handler for all other routes
    server.use((req: Request, res: Response) => {
      return handle(req, res);
    });

    // Global error handler
    server.use((err: Error, _req: Request, res: Response, _next: express.NextFunction) => {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({
          success: false,
          message: err.message,
          data: null,
        });
        return;
      }

      console.error("Unhandled error:", err);

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        data: null,
      });
    });

    server.listen(env.PORT, () => {
      console.log(`> Ready on http://localhost:${env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server", err);
    process.exit(1);
  });
