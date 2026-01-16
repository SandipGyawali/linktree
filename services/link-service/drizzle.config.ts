import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';
import { ENV } from 'src/config/env';

export default defineConfig({
  schema: './src/drizzle/schema/**.schema.ts',
  dialect: 'postgresql',
  out: "./migrations",
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
  verbose: process.env.NODE_ENV === "development",
});