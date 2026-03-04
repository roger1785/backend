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

const app = express();

app.use(express.json());

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 20 },
];

const categories = [
  { id: 1, name: "Electronics", description: "Electronic devices" },
  { id: 2, name: "Accessories", description: "Device accessories" },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  // const id = Number(req.params.id);
  const id = parseInt(req.params.id);

  // console.log(typeof req.params.id, typeof id, id, isNaN(id));

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

app.post("/products", (req, res) => {
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/categories", (req, res) => {
  res.json(categories);
});

app.get("/categories/:id", (req, res) => {
  // const id = Number(req.params.id);
  const id = parseInt(req.params.id);

  // console.log(typeof req.params.id, typeof id, id, isNaN(id));

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  const category = categories.find((c) => c.id === id);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  res.json(category);
});

app.post("/categories", (req, res) => {
  console.log(req.body);

  if (req.body.name == undefined || req.body.name == "") {
    return res.status(422).json({ error: "name is required" });
  }

  const newCategory = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(3000, () => console.log("http://localhost:3000"));
