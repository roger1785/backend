import * as http from "node:http";

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 20 },
];

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Accessories" },
];

const server = http.createServer((req, res) => {
  console.log(req.url);

  //   switch (req.url) {
  //     case "/":
  //       res.statusCode = 200;
  //       res.setHeader("Content-Type", "application/json");
  //       res.end(JSON.stringify({ message: "API Running" }));
  //       break;
  //     case "/ping":
  //       res.statusCode = 200;
  //       res.setHeader("Content-Type", "application/json");
  //       res.end(JSON.stringify({ message: "Pong" }));
  //       break;
  //   }

  // if (req.url == "/") {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "application/json");
  //   res.end(JSON.stringify({ message: "API Running" }));
  // } else if (req.url == "/ping") {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "application/json");
  //   res.end(JSON.stringify({ message: "Pong" }));
  // } else {
  //   res.statusCode = 404;
  //   res.setHeader("Content-Type", "application/json");
  //   res.end(JSON.stringify({ message: "Not Found" }));
  // }

  if (req.url == "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "API Running" }));
    return;
  }
  if (req.url == "/ping") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Pong" }));
    return;
  }
  // if (req.url == "/products") {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "application/json");
  //   res.end(JSON.stringify({ message: "Lista de productos" }));
  //   return;
  // }
  if (req.url == "/products") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(products));
    return;
  }

  if (req.url.startsWith("/products")) {
    const id = Number(req.url.split("/")[2]);
    const product = products.find((p) => p.id == id);

    if (!product) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Producto no encontrado" }));
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(product));
  }

  if (req.url == "/categories") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(categories));
    return;
  }

  if (req.url.startsWith("/categories")) {
    const id = Number(req.url.split("/")[2]);
    const category = categories.find((c) => c.id == id);

    if (!category) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Categoría no encontrada" }));
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(category));
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Not Found" }));
});

server.listen(3000, () => {
  console.log(`http://localhost:3000`);
});


