import { Router } from "express";

const router = Router();

const categories = [
  { id: 1, name: "Electronics", description: "Electronic devices" },
  { id: 2, name: "Accessories", description: "Device accessories" },
];

router.get("/", (req, res) => {
  res.json(categories);
});

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
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

export default router;
