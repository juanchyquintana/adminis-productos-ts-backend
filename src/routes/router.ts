import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "../controllers/product";
import productValidator from "../validator/productValidator";
import paramsValidator from "../validator/paramsValidator";

const router = Router();

router.get("/", getProduct);
router.get("/:id", paramsValidator, getProductById);
router.post("/", productValidator, createProduct);
router.put("/:id", paramsValidator, productValidator, updateProduct);
router.delete("/:id", paramsValidator, deleteProduct);

export default router;
