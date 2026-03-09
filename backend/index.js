import "dotenv/config";
import express from "express";
import cors from "cors";


import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = process.env.PORT || 5000;


const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: ["*"],
};


app.use(cors(corsOptions));
app.use(express.json());


app.use("/api", productRoutes);


app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});