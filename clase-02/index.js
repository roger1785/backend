import express from "express";

const app = express();

app.use(express.json());

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 20 },
];

const categories = [
  {
    id: 1,
    name: "Electro",
    description: "Lorem ipsum",
  },
  {
    id: 2,
    name: "Bazar",
    description: "Lorem ipsum bazar",
  },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  // const id = Number(req.params.id);
  const id = parseInt(req.params.id);

  // console.log(typeof req.params.id, typeof id, id, isNaN(id));

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const product = products.find((p) => p.id == id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

app.post("/products", (req, res) => {
  // console.log(req.body);

  // console.log(Date.now());

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

// app.get("/categorias/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id)) {
//     return res.status(400).json({ error: "Error de usuario" });
//   }

//   const categoria = categories.find((cat) => cat.id == id);

//   if (!categoria) {
//     return res.status(404).json({ error: "ERROR" }); // esto es el error 404 (no se encuentra)
//   }

//   res.json(categoria);
// });

// app.get("/categories/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id)) {
//     return res.status(400).json({ error: "Invalid category" });
//   }

//   const category = categories.find((cat) => cat.id == id);

//   if (!category) {
//     return res.status(404).json({ error: "category not found" });
//   }

//   res.json(category);
// });

app.get("/categories/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const category = categories.find((c) => c.id == req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
});

// app.post("/categorias", (req, res) => {
//   // console.log(req.body);
//   // res.send("ok");
//   const newCategory = {
//     id: Date.now(),
//     name: req.body.name,
//   };

//   categories.push(newCategory);

//   res.status(201).json(newCategory);
// });

// app.post("/categories", (req, res) => {
//   const newCategory = {
//     id: Date.now(),
//     name: req.body.name,
//     description: req.body.description,
//   };

//   categories.push(newCategory);

//   res.status(201).json(newCategory);
// });

// app.post("/categories", (req, res) => {
//   //console.log(req.body);
//   const newCategory = {
//     id: Date.now(),
//     name: req.body.name,
//   };

//   categories.push(newCategory);

//   res.status(201).json(newCategory);
// });

app.post("/categories", (req, res) => {
  console.log(req.body, req.body.name);

  // if (!req.body.name) {
  //   return res.status(422).json({ error: "name is required" });
  // }

  // if (req.body.name == undefined) {
  //   return res.status(422).json({ error: "name is required" });
  // }

  // if (req.body.name == "") {
  //   return res.status(422).json({ error: "name is required" });
  // }

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