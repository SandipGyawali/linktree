import z from "zod";

const ENV_SCHEMA = z.object({
  DATABASE_URL: z.url()
});

const ENV = ENV_SCHEMA.parse(process.env);

export { ENV };