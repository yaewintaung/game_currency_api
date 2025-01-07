import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../controllers/order.controller";
import upload from "../middleware/fileUpload";

const orderRoute = express.Router();

orderRoute.get("/orders", getAllOrders);
orderRoute.get("/orders/:id", getOrder);
orderRoute.post("/orders", upload.single("screenshot"), createOrder);
orderRoute.patch("/orders/:id", updateOrder);
orderRoute.delete("/orders/:id", deleteOrder);

export default orderRoute;
