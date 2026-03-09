import { body, validationResult } from "express-validator";

export const validateOrder = [
  body('email').isEmail().withMessage('Μη έγκυρο email'),
  body('fullName').notEmpty().withMessage('Το όνομα είναι υποχρεωτικό'),
  body('phone').isNumeric().withMessage('Το τηλέφωνο πρέπει να περιέχει μόνο αριθμούς'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];