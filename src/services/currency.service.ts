import { CurrencyPricing } from "@prisma/client";
import prisma from "../config/prisma";

export const getAllCurrencies = async () => {
  return await prisma.currencyPricing.findMany();
};

export const getCurrencyById = async (id: string) => {
  return await prisma.currencyPricing.findUnique({ where: { id } });
};

export const getCurrencyByGameId = async (id: string) => {
  return await prisma.currencyPricing.findMany({ where: { gameId: id } });
};

export const addCurrency = async (data: {
  currencyName: string;
  price: number;
  amount: number;
  gameId: string;
}) => {
  return await prisma.currencyPricing.create({ data });
};

export const editCurrency = async (
  id: string,
  data: { currencyName: string; price: number; amount: number; gameId: string }
) => {
  return await prisma.currencyPricing.update({ where: { id }, data });
};

export const removeCurrency = async (id: string) => {
  return await prisma.currencyPricing.delete({ where: { id } });
};
