import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "*", methods: "*" }));
app.use(express.json());


app.use("/api/stripe", stripeRoutes); 
app.use("/api/orders", orderRoutes);
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});