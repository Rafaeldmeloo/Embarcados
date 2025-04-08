import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export class Controller{
    async create(data:Prisma.RegistroCreateInput){
        const registros = await prisma.registro.create({data})

        return registros
    }
}