/*
  Warnings:

  - You are about to drop the `registros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "registros";

-- CreateTable
CREATE TABLE "Registro" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordenada" TEXT,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispositivo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Dispositivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_name_key" ON "Dispositivo"("name");

-- AddForeignKey
ALTER TABLE "Registro" ADD CONSTRAINT "Registro_name_fkey" FOREIGN KEY ("name") REFERENCES "Dispositivo"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
