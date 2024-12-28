import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../controllers/order.controller";

const orderRoute = express.Router();

orderRoute.get("/orders", getAllOrders);
orderRoute.get("/orders/:id", getOrder);
orderRoute.post("/orders", createOrder);
orderRoute.patch("/orders/:id", updateOrder);
orderRoute.delete("/orders/:id", deleteOrder);

export default orderRoute;
