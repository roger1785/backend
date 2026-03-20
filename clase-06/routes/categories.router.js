import { Router } from "express";

const router = Router();

import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, searchCategory } from "../controllers/categories.controller.js";

router.get("/search", searchCategory)

router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.post("/", createCategory);

router.put("/:id", updateCategory);

router.delete("/:id",deleteCategory);



export default router;
