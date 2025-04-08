import "dotenv/config";
import { z } from "zod";

const envShema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  MQTT_HOST: z.string().default("mqtt://localhost"),
  MQTT_PORT: z.coerce.number().default(1883),
});

const _env = envShema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid enviorment variables", _env.error.format());

  throw new Error("Invalid enviorment variables");
}

export const env = _env.data;