-- CreateTable
CREATE TABLE "registros" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordenada" TEXT,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "registros_pkey" PRIMARY KEY ("id")
);
