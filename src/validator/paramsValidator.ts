import { resultValidation } from "./validationResult";
import { param } from "express-validator";
import { Request, Response, NextFunction } from "express";

const paramsValidator = [
  param("id").isInt().withMessage("ID No Válido"),
  (req: Request, res: Response, next: NextFunction) => {
    resultValidation(req, res, next);
  },
];

export default paramsValidator;
