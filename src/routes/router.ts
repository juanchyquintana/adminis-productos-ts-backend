import { createProduct, getProduct } from "../controllers/product";
import { Router } from "express";

import productValidator from "../validator/productValidator";

const router = Router();

router.get("/", getProduct);
router.post("/", productValidator, createProduct);

export default router;
