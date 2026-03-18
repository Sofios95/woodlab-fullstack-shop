import express, { Router } from "express";
import {
  placeOrder,
  getAllOrders,
  updateStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { validateOrder } from "../middleware/orderValidator.js";

// Ορίζουμε ρητά ότι το router είναι τύπου Router της Express
const router: Router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Δημιουργία νέας παραγγελίας με validation
 */
router.post("/", validateOrder, placeOrder);

/**
 * @route   GET /api/orders/admin
 * @desc    Ανάκτηση όλων των παραγγελιών για το Admin Dashboard
 */
router.get("/admin", getAllOrders);

/**
 * @route   PUT /api/orders/admin/:id/status
 * @desc    Ενημέρωση κατάστασης (pending/completed)
 */
router.put("/admin/:id/status", updateStatus);

/**
 * @route   DELETE /api/orders/admin/:id
 * @desc    Διαγραφή παραγγελίας (μαζί με τα items της λόγω του transaction)
 */
router.delete("/admin/:id", deleteOrder);

export default router;