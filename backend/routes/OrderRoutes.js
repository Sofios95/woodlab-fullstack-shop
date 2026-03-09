import express from "express";
import { placeOrder, getAllOrders, updateStatus, deleteOrder } from "../controllers/OrderController.js";
import { validateOrder } from "../middleware/orderValidator.js";

const router = express.Router();

// 1. POST /api/orders (Αυτό που καλεί το Checkout)
router.post("/", validateOrder, placeOrder); 

// 2. GET /api/orders/admin (Πιο καθαρό, χωρίς το διπλό /orders)
router.get("/admin", getAllOrders);

// 3. PUT /api/orders/admin/:id/status
router.put("/admin/:id/status", updateStatus);

// 4. DELETE /api/orders/admin/:id
router.delete("/admin/:id", deleteOrder);

export default router;