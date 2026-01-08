import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  AMQP_URI: z.url(),
});

type EnvType = z.infer<typeof envSchema>;

export const ENV: EnvType = z.parse(envSchema, process.env);
