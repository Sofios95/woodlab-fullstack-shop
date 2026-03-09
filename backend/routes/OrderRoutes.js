import express from "express";
import { placeOrder, getAllOrders, updateStatus, deleteOrder } from "./controllers/OrderController.js";
import { validateOrder } from "../middleware/orderValidator.js";

const router = express.Router();

router.post("/", validateOrder, placeOrder); // Πρώτα ελέγχει, μετά αποθηκεύει
router.get("/admin/orders", getAllOrders);
router.put("/admin/orders/:id/status", updateStatus);
router.delete("/admin/orders/:id", deleteOrder);

export default router;