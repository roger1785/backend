import { Router } from "express";

const router = Router();

import { createCategory, getCategories, getCategoryById } from "../controllers/categories.controller.js";


router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.post("/", createCategory);

export default router;
