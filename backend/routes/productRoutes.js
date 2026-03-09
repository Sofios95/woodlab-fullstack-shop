import express from "express";
import { 
  getAllProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js";

const router = express.Router();

router.get("/home", getAllProducts);  
router.post("/admin", addProduct);      
router.put("/admin/:id", updateProduct);   
router.delete("/admin/:id", deleteProduct); 

export default router;