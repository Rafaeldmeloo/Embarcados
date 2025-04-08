import { Controller } from "./controller";
import { client } from "./mqtt-client";

export const routes = () => {

    const controller = new Controller()

    client.on("message", (topic, message) => {
        switch (topic) {
          case "DataGps":
            controller.create(JSON.parse(message.toString()))
            console.log("topico:",topic," message:",message.toString())
            break;
        }
      }

);
}