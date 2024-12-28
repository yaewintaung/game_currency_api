import { Request, Response } from "express";
import {
  addOrder,
  editOrder,
  getOrderById,
  getOrders,
  removeOrder,
} from "../services/order.service";
import ErrorMessage from "../util/ErrorMessage";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    // Call the getAllOrders function from the service
    const orders = await getOrders();
    // Send a response with the orders
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    // Call the getOrderById function from the service
    const order = await getOrderById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    // Send a response with the order
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { currencyId, userId } = req.body;
    // Call the addOrder function from the service
    const order = await addOrder({ currencyId, userId });
    // Send a response with the created order
    res.status(200).json({ order, message: "Order created successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { currencyId, userId } = req.body;
    const order = getOrderById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    // Call the editOrder function from the service
    const updatedOrder = await editOrder(id, { currencyId, userId });
    // Send a response with the updated order
    res
      .status(200)
      .json({ updatedOrder, message: "Order updated successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const order = getOrderById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    // Call the deleteOrder function from the service
    await removeOrder(id);
    // Send a response with the deleted order
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};
