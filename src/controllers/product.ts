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

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Proudct.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
