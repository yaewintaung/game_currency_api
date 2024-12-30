import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./router/user.routes";
import authRouter from "./router/auth.routes";
import gameRouter from "./router/game.routes";
import currencyRouter from "./router/currency.routes";
import orderRoute from "./router/order.routes";
import { isAuthenticated } from "./middleware/index";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", gameRouter);
app.use("/api", currencyRouter);
app.use("/api", orderRoute);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hello").end();
});

export default app;
