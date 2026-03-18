import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
// ΣΗΜΑΝΤΙΚΟ: Στα ES Modules της TS, κρατάμε το .js στο τέλος του import 
// για να ξέρει ο compiler πού να ψάξει μετά το build!
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";

const app: Application = express();
const port: string | number = process.env.PORT || 5000;

// Middleware με Types
app.use(cors({ origin: "*", methods: "*" }));
app.use(express.json());

// Routes
app.use("/api/stripe", stripeRoutes); 
app.use("/api/orders", orderRoutes);
app.use("/api", productRoutes);

// Ένα προαιρετικό Health Check route για να βλέπεις αν "ζει" ο server
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Woodlab API is flying! 🪵" });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`💪 i9 Power engaged!`);
});