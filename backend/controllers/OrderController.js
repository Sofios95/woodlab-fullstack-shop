import db from "../config/db.js";

// POST /api/orders (Το checkout σου)
export const placeOrder = async (req, res) => {
  const client = await db.connect();
  try {
    const { total, items, fullName, email, phone, address } = req.body;
    await client.query("BEGIN");

    const orderRes = await client.query(
      `INSERT INTO orders (total_amount, status, created_at, customer_name, customer_email, customer_phone, customer_address) 
       VALUES ($1, 'pending', NOW(), $2, $3, $4, $5) RETURNING id`,
      [total, fullName, email, phone, address]
    );

    const orderId = orderRes.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)`, 
        [orderId, item.id, item.quantity, item.price]
      );
      await client.query(
        `UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2`, 
        [item.quantity, item.id]
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ message: "Order placed!", orderId });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Σφάλμα παραγγελίας: " + err.message });
  } finally {
    client.release();
  }
};

// GET /api/orders/admin/orders
export const getAllOrders = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM orders ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Αποτυχία ανάκτησης" });
  }
};

// PUT /api/orders/admin/orders/:id/status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.query("UPDATE orders SET status = $1 WHERE id = $2", [status, id]);
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).send("Error");
  }
};

// DELETE /api/orders/admin/orders/:id
export const deleteOrder = async (req, res) => {
  const client = await db.connect();
  try {
    const { id } = req.params;
    await client.query("BEGIN");
    await client.query("DELETE FROM order_items WHERE order_id = $1", [id]);
    await client.query("DELETE FROM orders WHERE id = $1", [id]);
    await client.query("COMMIT");
    res.json({ message: "Order deleted!" });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).send("Error");
  } finally {
    client.release();
  }
};