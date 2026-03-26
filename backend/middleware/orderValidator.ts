import {
  body,
  validationResult,
  Result,
  ValidationError,
} from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateOrder: any[] = [
  body("email").isEmail().withMessage("Μη έγκυρο email"),

  body("fullName").trim().notEmpty().withMessage("Το όνομα είναι υποχρεωτικό"),

  body("phone")
    .matches(/^[0-9+\s]+$/)
    .withMessage("Το τηλέφωνο δεν είναι έγκυρο"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];
