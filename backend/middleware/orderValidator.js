import { body, validationResult } from "express-validator";

export const validateOrder = [
  body('email').isEmail().withMessage('Μη έγκυρο email'),
  body('fullName').trim().notEmpty().withMessage('Το όνομα είναι υποχρεωτικό'),
  body('phone').matches(/^[0-9+\s]+$/).withMessage('Το τηλέφωνο δεν είναι έγκυρο'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];