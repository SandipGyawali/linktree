import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  AMQP_URI: z.url(),
  SMTP_HOST: z.string(),
  SMTP_SECURE: z.coerce.boolean(),
  SMTP_PASS: z.string(),
  SMTP_USER: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_DEFAULT_FROM: z.string()
});

type EnvType = z.infer<typeof envSchema>;

export const ENV: EnvType = z.parse(envSchema, process.env);
