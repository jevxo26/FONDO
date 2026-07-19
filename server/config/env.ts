import dotenv from "dotenv";

dotenv.config();

const requiredVars = [
  "DATABASE_URL",
  "JWT_SECRET",
] as const;

for (const varName of requiredVars) {
  if (!process.env[varName]) {
    throw new Error(`Missing required env var: ${varName}`);
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3000", 10),
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "30d",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  SSLCOMMERZ_STORE_ID: process.env.SSLCOMMERZ_STORE_ID || "",
  SSLCOMMERZ_STORE_PASSWD: process.env.SSLCOMMERZ_STORE_PASSWD || "",
  SSLCOMMERZ_IS_LIVE: process.env.SSLCOMMERZ_IS_LIVE === "true",
} as const;
