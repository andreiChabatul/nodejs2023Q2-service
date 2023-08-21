/*
  Warnings:

  - The required column `id` was added to the `UserData` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "UserData" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UserData_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "TokenBase" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,

    CONSTRAINT "TokenBase_pkey" PRIMARY KEY ("id")
);
