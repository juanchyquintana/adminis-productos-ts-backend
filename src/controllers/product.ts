import Proudct from "../models/Product.model";
import { Request, Response } from "express";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Proudct.findAll();
    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Proudct.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto No Encontrado" });
    }

    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Proudct.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Proudct.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto No Encontrado" });
    }

    await product.update(req.body);
    await product.save();

    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Proudct.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Producto No Encontrado" });
    }

    await product.destroy();
    res.json({ data: "Producto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};
