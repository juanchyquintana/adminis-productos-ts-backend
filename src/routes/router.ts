import { Router } from "express";
import { createProduct } from "../controllers/product";

const router = Router()

router.get('/', (req, res) => {
    res.json('Hooola')
})

router.post('/', createProduct)

export default router;