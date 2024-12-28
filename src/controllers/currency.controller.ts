import { Request, Response } from "express";
import {
  addCurrency,
  editCurrency,
  getAllCurrencies,
  getCurrencyByGameId,
  getCurrencyById,
  removeCurrency,
} from "../services/currency.service";
import ErrorMessage from "../util/ErrorMessage";

export const getCurrencies = async (req: Request, res: Response) => {
  try {
    // Call the getAllCurrencies function from the service
    const currencies = await getAllCurrencies();
    // Send a response with the currencies
    res.status(200).json(currencies);
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const getCurrency = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const currency = await getCurrencyById(id);
    if (!currency) {
      res.status(404).json({ error: "Currency not found" });
      return;
    }
    res.status(200).json(currency);
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const getCurrenciesByGameId = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  try {
    // Call the getCurrencyByGameId function from the service
    const currencies = await getCurrencyByGameId(gameId);

    // Send a response with the currencies
    res.status(200).json(currencies);
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const createCurrency = async (req: Request, res: Response) => {
  try {
    let { currencyName, price, amount, gameId } = req.body;
    price = Number(price);
    amount = Number(amount);
    // Call the addCurrency function from the service
    const currency = await addCurrency({ currencyName, price, amount, gameId });
    // Send a response with the created currency
    res
      .status(200)
      .json({ currency, message: "Currency created successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const updateCurrency = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    let { currencyName, price, amount, gameId } = req.body;

    const currency = await getCurrencyById(id);
    if (!currency) {
      res.status(404).json({ message: "Currency not found" });
      return;
    }
    price = Number(price);
    amount = Number(amount);
    // Call the addCurrency function from the service
    const updatedCurrency = await editCurrency(id, {
      currencyName,
      price,
      amount,
      gameId,
    });
    // Send a response with the created currency
    res
      .status(200)
      .json({ updatedCurrency, message: "Currency updated successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};

export const deleteCurrency = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const currency = await getCurrencyById(id);
    if (!currency) {
      res.status(404).json({ message: "Currency not found" });
      return;
    }
    // Call the removeCurrency function from the service
    await removeCurrency(id);
    // Send a response with the message
    res.status(200).json({ message: "Currency deleted successfully" });
  } catch (error) {
    res.status(400).json(ErrorMessage(error));
  }
};
