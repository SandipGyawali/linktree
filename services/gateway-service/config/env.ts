import "dotenv/config";
import z from "zod";


const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  GATEWAY_PORT: z.coerce.number().int().max(65_535).min(3000)
});


type EnvType = z.infer<typeof envSchema>;

export const ENV: EnvType = z.parse(envSchema, process.env);