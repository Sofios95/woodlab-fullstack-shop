import { body, validationResult, Result, ValidationError } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware για το validation της παραγγελίας.
 * Χρησιμοποιούμε RequestHandler για να ξέρει η Express τι τύπος συνάρτησης είναι.
 */
export const validateOrder: any[] = [
  body('email')
    .isEmail()
    .withMessage('Μη έγκυρο email'),
    
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Το όνομα είναι υποχρεωτικό'),
    
  body('phone')
    .matches(/^[0-9+\s]+$/)
    .withMessage('Το τηλέφωνο δεν είναι έγκυρο'),

  // Το τελικό function που ελέγχει τα αποτελέσματα
  (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }
    
    next();
  }
];