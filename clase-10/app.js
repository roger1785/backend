import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "./db.js";

import productsRouter from "./routes/products.router.js";
import categoriesRouter from "./routes/categories.router.js";
import pingRouter from "./routes/ping.router.js";

const app = express();

app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use(pingRouter);

export default app;