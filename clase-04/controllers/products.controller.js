const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 20 },
];

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
};

export const createProduct = (req, res) => {
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const id = parseInt(req.params.id); 
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  } 
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  } 
const { name, price } = req.body;
if(!name || !price) {
  return res.status(400).json({ error: "Name and price are required" });
} 
product.name = name;
product.price = price;

  res.json(product);
};

export const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  } 
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }   
  products.splice(productIndex, 1);
  res.status(204).send();
};



