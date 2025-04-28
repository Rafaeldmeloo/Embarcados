import path from 'path';
import { Controller } from '../../../backend/controller'; // Caminho relativo para fora da pasta do Next

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const controller = new Controller();
    const data = req.body;

    try {
      const result = await controller.create(data);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar registro' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}


/*import { Controller } from '../../backend/controller';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const controller = new Controller();
    const data = req.body;

    try {
      const resultado = await controller.create(data);
      res.status(201).json(resultado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar registro' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
*/