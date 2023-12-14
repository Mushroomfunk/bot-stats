/*
  Warnings:

  - The `algoId` column on the `Bot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `algoClOrdId` column on the `Bot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `maxPx` column on the `Bot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minPx` column on the `Bot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gridNum` column on the `Bot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `investment` column on the `Bot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `arbitrageNum` column on the `BotHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalPnl` column on the `BotHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pnlRatio` column on the `BotHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gridProfit` column on the `BotHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `floatProfit` column on the `BotHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "basePos" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "direction" TEXT,
ADD COLUMN     "lever" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "algoId",
ADD COLUMN     "algoId" BIGINT NOT NULL DEFAULT 0,
DROP COLUMN "algoClOrdId",
ADD COLUMN     "algoClOrdId" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "maxPx",
ADD COLUMN     "maxPx" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "minPx",
ADD COLUMN     "minPx" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "gridNum",
ADD COLUMN     "gridNum" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "investment",
ADD COLUMN     "investment" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "BotHistory" ADD COLUMN     "actualLever" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "arbitrageNum",
ADD COLUMN     "arbitrageNum" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "totalPnl",
ADD COLUMN     "totalPnl" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "pnlRatio",
ADD COLUMN     "pnlRatio" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "gridProfit",
ADD COLUMN     "gridProfit" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "floatProfit",
ADD COLUMN     "floatProfit" DOUBLE PRECISION NOT NULL DEFAULT 0;
