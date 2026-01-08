import "dotenv/config";
import z from "zod";


const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  GATEWAY_PORT: z.coerce.number().int().max(65_535).min(3000),
  AMQP_URI: z.url(),
  
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number(),
  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_DATABASE: z.coerce.number(),
  REDIS_KEY_PREFIX: z.string()
});


type EnvType = z.infer<typeof envSchema>;

export const ENV: EnvType = z.parse(envSchema, process.env);