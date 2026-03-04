export const getProducts = (req, res) => {
  res.json(products);
};


export const getProductById = (req, res) => {
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
}

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 20 },
];  