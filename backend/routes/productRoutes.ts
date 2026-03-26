import express, { Router } from "express";
import { 
  getAllProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js";

// Ορίζουμε ρητά τον τύπο Router
const router: Router = express.Router();

/**
 * @route   GET /api/home
 * @desc    Επιστρέφει όλα τα προϊόντα για το frontend
 */
router.get("/home", getAllProducts);

/**
 * @route   POST /api/admin
 * @desc    Προσθήκη νέου προϊόντος από το Admin Dashboard
 */
router.post("/admin", addProduct);

/**
 * @route   PUT /api/admin/:id
 * @desc    Ενημέρωση υπάρχοντος προϊόντος βάσει ID
 */
router.put("/admin/:id", updateProduct);

/**
 * @route   DELETE /api/admin/:id
 * @desc    Διαγραφή προϊόντος
 */
router.delete("/admin/:id", deleteProduct);

export default router;