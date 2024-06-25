import { resultValidation } from "./validationResult";
import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";

const productValidator = [
  check("name").notEmpty().withMessage("El Nombre es Obligatorio"),
  check("price")
    .notEmpty()
    .withMessage("El Precio es Obligatorio")
    .isNumeric()
    .withMessage("Valor no Valido")
    .custom((value) => value > 0)
    .withMessage("Precio No Válido"),
  (req: Request, res: Response, next: NextFunction) => {
    resultValidation(req, res, next);
  },
];

export default productValidator;
