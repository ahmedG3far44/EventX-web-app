import { Router } from "express";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../controllers/categories.controllers.js";
import verifyIsAdmin from "../middlewares/verifyIsAdmin.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const router = Router();

router.get("/", verifyAccessToken, getCategories);
router.post("/", verifyIsAdmin, createCategory);
router.delete("/:id", verifyIsAdmin, deleteCategory);

export default router;