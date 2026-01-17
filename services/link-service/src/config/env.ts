import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  AMQP_URI: z.url(),
  DATABASE_URL: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_DATABASE: z.coerce.number(),
  REDIS_KEY_PREFIX: z.string(),
  
  ELASTICSEARCH_NODE: z.url()
});

type EnvType = z.infer<typeof envSchema>;

export const ENV: EnvType = z.parse(envSchema, process.env);