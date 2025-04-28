import express from 'express';
import { Controller, getLatestRegistroByName, getAllObjetos, createObjeto} from './controller'; // <- importar ambos
import { client } from './mqtt-client';

const router = express.Router();

const controller = new Controller();

client.on('message', (topic, message) => {
  switch (topic) {
    case 'DataGps':
      controller.create(JSON.parse(message.toString()));
      console.log('tópico:', topic, 'message:', message.toString());
      break;
  }
});

// Registrar a rota HTTP corretamente
router.get('/registro/:name/latest', getLatestRegistroByName);

router.get('/objetos', getAllObjetos);

router.post('/objetos', createObjeto);

export default router;
