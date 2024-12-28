import express from "express";
import {
  createCurrency,
  deleteCurrency,
  getCurrencies,
  getCurrency,
  updateCurrency,
} from "../controllers/currency.controller";

const currencyRouter = express.Router();

currencyRouter.get("/currencies", getCurrencies);
currencyRouter.get("/currencies/:id", getCurrency);
currencyRouter.post("/currencies/", createCurrency);
currencyRouter.patch("/currencies/:id", updateCurrency);
currencyRouter.delete("/currencies/:id", deleteCurrency);

export default currencyRouter;
