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
import productsRouter from "./routes/products.router.js";
import categoriesRouter from "./routes/categories.router.js";
import pingRouter from "./routes/ping.router.js";

const app = express();

app.use(express.json());
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/ping", pingRouter);


app.listen(3000, () => console.log("http://localhost:3000"));
