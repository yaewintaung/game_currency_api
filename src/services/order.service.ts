import { Order } from "@prisma/client";
import prisma from "../config/prisma";

export const getOrders = async () => {
  return await prisma.order.findMany();
};

export const getOrderByCurrencyId = async (currencyId: string) => {
  return await prisma.order.findMany({
    where: {
      currencyId: currencyId,
    },
  });
};

export const getOrderById = async (id: string) => {
  return await prisma.order.findUnique({ where: { id } });
};

export const addOrder = async (data: {
  currencyId: string;
  userId: string;
}): Promise<Order | null> => {
  return await prisma.order.create({ data });
};

export const editOrder = async (
  id: string,
  data: { currencyId: string; userId: string }
) => {
  return await prisma.order.update({ where: { id }, data });
};

export const removeOrder = async (id: string) => {
  return await prisma.order.delete({ where: { id } });
};
