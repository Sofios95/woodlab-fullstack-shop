import { Request, Response } from "express";
import db from "../config/db.js";
import { PoolClient } from "pg";

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
}

interface OrderRequestBody {
  total: number;
  items: OrderItem[];
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export const placeOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const client: PoolClient = await db.connect();

  try {
    const { total, items, fullName, email, phone, address }: OrderRequestBody =
      req.body;

    await client.query("BEGIN");

    const orderRes = await client.query<{ id: number }>(
      `INSERT INTO orders (total_amount, status, created_at, customer_name, customer_email, customer_phone, customer_address) 
       VALUES ($1, 'pending', NOW(), $2, $3, $4, $5) RETURNING id`,
      [total, fullName, email, phone, address],
    );

    const orderId = orderRes.rows[0]?.id;

    if (!orderId) throw new Error("Failed to retrieve Order ID");

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)`,
        [orderId, item.id, item.quantity, item.price],
      );

      await client.query(
        `UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2`,
        [item.quantity, item.id],
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ message: "Order placed! 🪵✨", orderId });
  } catch (err: any) {
    await client.query("ROLLBACK");
    console.error("❌ TRANSACTION ERROR:", err.message);
    res.status(500).json({ error: "Σφάλμα παραγγελίας: " + err.message });
  } finally {
    client.release();
  }
};

export const getAllOrders = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await db.query(
      `SELECT * FROM orders ORDER BY created_at DESC`,
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: "Αποτυχία ανάκτησης" });
  }
};

export const updateStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status }: { status: string } = req.body;
    await db.query("UPDATE orders SET status = $1 WHERE id = $2", [status, id]);
    res.json({ message: "Status updated ✅" });
  } catch (err: any) {
    res.status(500).json({ error: "Error updating status" });
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const client: PoolClient = await db.connect();
  try {
    const { id } = req.params;
    await client.query("BEGIN");

    await client.query("DELETE FROM order_items WHERE order_id = $1", [id]);
    await client.query("DELETE FROM orders WHERE id = $1", [id]);
    await client.query("COMMIT");
    res.json({ message: "Order deleted! 🗑️" });
  } catch (err: any) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Error deleting order" });
  } finally {
    client.release();
  }
};
