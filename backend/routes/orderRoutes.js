import express from "express";
import {
  placeOrder,
  getAllOrders,
  updateStatus,
  deleteOrder,
} from "../controllers/οrderController.js";
import { validateOrder } from "../middleware/orderValidator.js";

const router = express.Router();

router.post("/", validateOrder, placeOrder);

router.get("/admin", getAllOrders);

router.put("/admin/:id/status", updateStatus);

router.delete("/admin/:id", deleteOrder);

export default router;
