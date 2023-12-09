-- CreateEnum
CREATE TYPE "BotState" AS ENUM ('starting', 'running', 'stopped', 'no_close_position');

-- CreateEnum
CREATE TYPE "InstrumentType" AS ENUM ('SPOT', 'MARGIN', 'FUTURES', 'SWAP');

-- CreateTable
CREATE TABLE "UserProvider" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "passphrase" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "userId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BotHistory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "arbitrageNum" TEXT NOT NULL,
    "totalPnl" TEXT NOT NULL,
    "pnlRatio" TEXT NOT NULL,
    "gridProfit" TEXT NOT NULL,
    "floatProfit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "botId" UUID,

    CONSTRAINT "BotHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bot" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "algoId" TEXT NOT NULL,
    "algoClOrdId" TEXT NOT NULL,
    "instId" TEXT NOT NULL,
    "state" "BotState" NOT NULL,
    "maxPx" TEXT NOT NULL,
    "minPx" TEXT NOT NULL,
    "gridNum" TEXT NOT NULL,
    "runType" TEXT NOT NULL,
    "investment" TEXT NOT NULL,
    "instFamily" TEXT NOT NULL,

    CONSTRAINT "Bot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProvider_name_key" ON "UserProvider"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserProvider" ADD CONSTRAINT "UserProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BotHistory" ADD CONSTRAINT "BotHistory_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
