import Category from "../models/Category.js";


// const categories = [
//   { id: 1, name: "Electronics", description: "Electronic devices" },
//   { id: 2, name: "Accessories", description: "Device accessories" },
// ];

// export const getCategories = (req, res) => {
//   res.json(categories);
// };

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};


export const getCategoryById = async(req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    console.log(category);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);    
  }catch (error) {
    res.status(404).json({ error: "Invalid category id" });
}
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryUpdated = await Category.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    if (!categoryUpdated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(categoryUpdated);
  } catch {
    res.status(404).json({ message: "Invalid category ID" });
  }
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

// export const updateCategory = (req, res) => {
//   const id = parseInt(req.params.id); 
//   if (isNaN(id)) {
//     return res.status(400).json({ error: "Invalid category ID" });
//   } 
//   const category = categories.find((c) => c.id === id);

//   if (!category) {
//     return res.status(404).json({ error: "Category not found" });
//   } 
// const { name, description } = req.body;
// if(!name || !description) {
//   return res.status(400).json({ error: "Name and description are required" });
// } 
// category.name = name;
// category.description = description; 
 
//   res.json(category);
// };

// export const deleteCategory = (req, res) => {
//   const id = parseInt(req.params.id);
//   if (isNaN(id)) {
//     return res.status(400).json({ error: "Invalid category ID" });
//   } 
//   const categoryIndex = categories.findIndex((c) => c.id === id);

//   if (categoryIndex === -1) {
//     return res.status(404).json({ error: "Category not found" });
//   }  
//   categories.splice(categoryIndex, 1);

//   res.status(204).send();
  
// }; 


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndDelete(id);
    if (!categoryDeleted) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Invalid category ID" });
  }
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

