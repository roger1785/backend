import { validateStock, validatePrice } from "../utils/validators.js";

import Product from "../models/Product.js";

const products = [
  { id: 1, name: "Laptop", price: 1200, stock: 10 },
  { id: 2, name: "Mouse", price: 20, stock: 50 },
];

// export const getProducts = (req, res) => {
//   res.json(products);
// };

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const product = products.find((p) => p.id == id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
};

export const createProduct = async (req, res) => {
  if (!validateStock(req.body.stock)) {
    return res.status(422).json({ error: "Invalid stock" });
  }

  if (!validatePrice(req.body.price)) {
    return res.status(422).json({ error: "Invalid price" });
  }

  const data = {
    name: req.body.name,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json(product);
};

export const updateProduct = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const product = products.find((p) => p.id == id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // console.log(product);
  // console.log(req.body);

  if (!validateStock(req.body.stock)) {
    return res.status(422).json({ error: "Invalid stock" });
  }

  if (!validatePrice(req.body.price)) {
    return res.status(422).json({ error: "Invalid price" });
  }

  const { name, price, stock } = req.body;

  // console.log(name, price, stock);

  product.name = name;
  product.price = Number(price);
  product.stock = Number(stock);

  // console.log(product);

  res.json(product);
};

export const deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: " Invalid ID" });
  }

  const productIndex = products.findIndex((p) => p.id == id);

  // if (productIndex < 0) {
  if (productIndex == -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(productIndex, 1);

  res.status(204).send();
};

export const searchProduct = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(422).json({ error: "Name is required" });
  }

  const products = await Product.find({
    name: { $regex: name, $options: "i" },
  });

  res.json(products);

  // const filtrados = products.filter((p) =>
  //   p.name.toLowerCase().includes(name.toLowerCase()),
  // );

  // res.json(filtrados);
};
