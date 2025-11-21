import z from "zod";

const ENV_SCHEMA = z.object({});

const CLIENT_ENV = ENV_SCHEMA.parse(import.meta.env);

export { CLIENT_ENV };