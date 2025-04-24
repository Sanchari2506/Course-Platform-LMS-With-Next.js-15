import { defineConfig } from "drizzle-kit";
import { env } from "./src/data/env/server";

export default defineConfig({
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    strict: true,
    verbose: true,
    dialect: "postgresql",
    dbCredentials: {
        password: env.DATABASE_PASSWORD,
        user: env.DATABASE_USER,
        database: env.DATABASE_NAME,
        host: env.DATABASE_HOST,
        ssl: false
    },
});