// import * as http from "node:http";

// const server = http.createServer((request, response) => {
//   if (request.url == "/ping") {
//     response.statusCode = 200;
//     response.setHeader("Content-Type", "application/json");
//     response.end(JSON.stringify({ message: "pong" }));
//     return;
//   }

//   response.statusCode = 404;
//   response.setHeader("Content-Type", "application/json");
//   response.end(JSON.stringify({ error: "Not Found" }));
// });

// server.listen(3000, () => console.log("http://localhost:3000"));

import express from "express";
import productsRouter from "./routes/products.router";
import categoriesRouter from "./routes/categories.router";
import pingRouter from "./routes/ping.router";

const app = express();

app.use(express.json());
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/ping", pingRouter);

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 20 },
];

const categories = [
  { id: 1, name: "Electronics", description: "Electronic devices" },
  { id: 2, name: "Accessories", description: "Device accessories" },
];




// app.get("/ping", (req, res) => {
//   res.json({ message: "pong" });
// });

app.listen(3000, () => console.log("http://localhost:3000"));
