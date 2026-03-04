import { Router } from "express";

const router = Router();

import {
  getProductById,
  getProducts,
} from "../controllers/products.controller.js";

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 20 },
];

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", (req, res) => {
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

export default router;
