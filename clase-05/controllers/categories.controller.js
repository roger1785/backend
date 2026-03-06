const categories = [
  { id: 1, name: "Electronics", description: "Electronic devices" },
  { id: 2, name: "Accessories", description: "Device accessories" },
];

export const getCategories = (req, res) => {
  res.json(categories);
};

export const getCategoryById = (req, res) => {
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
};

export const createCategory = (req, res) => {
  const newCategory = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
};

export const updateCategory = (req, res) => {
  const id = parseInt(req.params.id); 
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  } 
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  } 
const { name, description } = req.body;
if(!name || !description) {
  return res.status(400).json({ error: "Name and description are required" });
} 
category.name = name;
category.description = description; 
 
  res.json(category);
};

export const deleteCategory = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  } 
  const categoryIndex = categories.findIndex((c) => c.id === id);

  if (categoryIndex === -1) {
    return res.status(404).json({ error: "Category not found" });
  }  
  categories.splice(categoryIndex, 1);

  res.status(204).send();
  
}; 

export const searchCategory = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(422).json({ error: "Name is required" });
  }

  const categories = await Category.find({
    name: { $regex: name, $options: "i" },
  });

  res.json(categories);

};
