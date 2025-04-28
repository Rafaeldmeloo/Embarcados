import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { client } from './mqtt-client';

import { Request, Response } from 'express';

export class Controller{
    async create(data:{'name' : string,
        coordenada?: string | null}){
        const registros = await prisma.registro.create({data})

        return registros
    }
}

export const getAllObjetos = async (req: Request, res: Response) => {
  try {
    const objetos = await prisma.objeto.findMany({
      select: {
        name: true, // Só traz o campo name
      },
    });

    return res.json(objetos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao buscar objetos' });
  }
}

export const createObjeto = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name é obrigatório' });
    }

    const novoObjeto = await prisma.objeto.create({
      data: {
        name,
      },
    });

    return res.status(201).json(novoObjeto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao criar objeto' });
  }
}

export const getLatestRegistroByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
  
      if (!name) {
        return res.status(400).json({ error: 'Name é obrigatório' });
      }

      // Aqui publicamos a mensagem MQTT
      client.publish('chamada', name, (err) => {
      if (err) {
        console.error('Erro ao publicar no tópico chamada:', err);
      } else {
        console.log(`Mensagem "${name}" publicada no tópico "chamada"`);
      }
    });
  
      const registro = await prisma.registro.findFirst({
        where: { name },
        orderBy: { createdAt: 'desc' },
      });
  
      if (!registro) {
        return res.status(404).json({ message: 'Registro não encontrado' });
      }
  
      return res.json(registro);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };
