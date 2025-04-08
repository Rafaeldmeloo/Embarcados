import { client } from "./mqtt-client";
import {routes} from "./routes";


export const startMqtt = () => {
  client.on("connect", () => {
    console.log("Connected to MQTT broker");

    client.subscribe("DataGps", (err) => {
      if (err) {
        console.error('Erro ao se inscrever no tópico "auth":', err);
      } else {
        console.log('Inscrito no tópico "auth"');
      }
    });
  });
  routes();


};

startMqtt();