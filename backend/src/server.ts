import express from 'express';
import { client } from './mqtt-client';
import router from './routes';
import cors from 'cors';


const app = express();

app.use(cors({
  origin: '*', // permite qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // libera esses métodos
}));

app.use(express.json());
app.use(router);

const startMqtt = () => {
  client.on('connect', () => {
    console.log('Connected to MQTT broker');

    client.subscribe('DataGps', (err) => {
      if (err) {
        console.error('Erro ao se inscrever no tópico "DataGps":', err);
      } else {
        console.log('Inscrito no tópico "DataGps"');
      }
    });
  });
};

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});

startMqtt();
