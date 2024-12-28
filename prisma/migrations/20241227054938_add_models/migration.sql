-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyPricing" (
    "id" TEXT NOT NULL,
    "currencyName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "CurrencyPricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CurrencyPricing" ADD CONSTRAINT "CurrencyPricing_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "CurrencyPricing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
