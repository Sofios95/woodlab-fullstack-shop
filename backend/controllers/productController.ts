import { Request, Response } from "express";
import db from "../config/db.js";

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string;
}

export const getAllProducts = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  console.log("--- Request: getAllProducts ---");
  try {
    const result = await db.query<Product>(`SELECT * FROM public.products`);
    console.log("✅ Success: Found", result.rows.length, "products");
    res.json(result.rows);
  } catch (err: any) {
    console.error("❌ DATABASE ERROR (getAllProducts):", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, description, price, stock_quantity, image_url }: Product =
      req.body;

    const result = await db.query<Product>(
      `INSERT INTO public.products (name, description, price, stock_quantity, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, price, stock_quantity, image_url],
    );

    res.status(201).send(result.rows[0]);
  } catch (err: any) {
    console.error("❌ DATABASE ERROR (addProduct):", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, description, image_url, stock_quantity }: Product =
      req.body;

    await db.query(
      "UPDATE public.products SET name=$1, price=$2, description=$3, image_url=$4, stock_quantity=$5 WHERE id=$6",
      [name, price, description, image_url, stock_quantity, id],
    );

    res.json({ message: "Product updated! 🪵" });
  } catch (err: any) {
    console.error("❌ DATABASE ERROR (updateProduct):", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM public.products WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ message: "Product deleted! 🗑️" });
  } catch (err: any) {
    console.error("❌ DATABASE ERROR (deleteProduct):", err.message);
    res.status(500).json({ error: err.message });
  }
};
