import mqtt from "mqtt";
import { env } from "./env";

const mqttHost = env.MQTT_HOST;
const mqttPort = env.MQTT_PORT;

export const client = mqtt.connect({ host: mqttHost, port: mqttPort });