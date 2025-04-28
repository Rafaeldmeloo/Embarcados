/*
  Warnings:

  - You are about to drop the `Dispositivo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Registro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Registro" DROP CONSTRAINT "Registro_name_fkey";

-- DropTable
DROP TABLE "Dispositivo";

-- DropTable
DROP TABLE "Registro";

-- CreateTable
CREATE TABLE "registros" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordenada" TEXT,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "registros_pkey" PRIMARY KEY ("id")
);
