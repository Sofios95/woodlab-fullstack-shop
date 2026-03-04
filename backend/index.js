import 'dotenv/config';
import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "*",
  allowedHeaders: ["*"],
};

const db = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors(corsOptions));
app.use(express.json());


app.get("/api/home", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM products`);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});



app.post("/api/admin", async (req, res) => {
  try {
    const { name, description, price, stock_quantity, image_url } = req.body;
    const newProducts = await db.query(
      `INSERT INTO products (name,description,price,stock_quantity,image_url)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [name, description, price, stock_quantity, image_url],
    );
    res.send(newProducts.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/orders", async (req, res) => {
  const client = await db.connect();
  try {
    // 1. Παίρνουμε τα δεδομένα από το request body
    const { total, items, fullName, email, phone, address } = req.body; 

    await client.query("BEGIN"); // Ξεκινάμε τη συναλλαγή

    // 2. Εισαγωγή στον πίνακα orders (με NOW() για την ημερομηνία)
    const orderRes = await client.query(
      `INSERT INTO orders (
        total_amount, 
        status, 
        created_at, 
        customer_name, 
        customer_email, 
        customer_phone, 
        customer_address
      ) VALUES ($1, $2, NOW(), $3, $4, $5, $6) RETURNING id`,
      [total, "pending", fullName, email, phone, address]
    );
    
    const orderId = orderRes.rows[0].id;

    // 3. Εισαγωγή προϊόντων στο order_items & Ενημέρωση αποθέματος (Stock)
    const itemsQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) 
      VALUES ($1, $2, $3, $4)
    `;
    const updateStockQuery = `
      UPDATE products 
      SET stock_quantity = stock_quantity - $1 
      WHERE id = $2
    `;

    for (const item of items) {
      // Προσθήκη του item στην παραγγελία
      await client.query(itemsQuery, [orderId, item.id, item.quantity, item.price]);
      // Αφαίρεση από το stock
      await client.query(updateStockQuery, [item.quantity, item.id]);
    }

    await client.query("COMMIT"); // Ολοκλήρωση επιτυχώς
    res.status(201).json({ message: "Order placed!", orderId: orderId });

  } catch (err) {
    await client.query("ROLLBACK"); // Ακύρωση σε περίπτωση σφάλματος
    console.error("Order Error:", err.message);
    res.status(500).json({ error: "Σφάλμα κατά την αποθήκευση: " + err.message });
  } finally {
    client.release();
  }
});


// GET: Προϊόντα ανά κατηγορία
app.get("/products/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "SELECT * FROM products WHERE category_id = $1",
      [id],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted!" });
  } catch (err) {
    res.status(500).send("Error deleting product");
  }
});

app.delete("/api/admin/orders/:id", async (req, res) => {
  const client = await db.connect();
  try {
    const { id } = req.params;
    await client.query("BEGIN");
    
    // Πρώτα σβήνουμε τα items της παραγγελίας για να μη φάμε error
    await client.query("DELETE FROM order_items WHERE order_id = $1", [id]);
    
    // Μετά σβήνουμε την ίδια την παραγγελία
    await client.query("DELETE FROM orders WHERE id = $1", [id]);
    
    await client.query("COMMIT");
    res.json({ message: "Order and items deleted!" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).send("Error deleting order");
  } finally {
    client.release();
  }
});

app.put("/api/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // ΠΡΟΣΤΕΘΗΚΕ ΤΟ stock_quantity ΣΤΟ DESTRUCTURING
    const { name, price, description, image_url, stock_quantity } = req.body; 
    
    // ΠΡΟΣΤΕΘΗΚΕ ΤΟ stock_quantity ΣΤΟ UPDATE QUERY ΚΑΙ ΤΟ $6
    await db.query(
      "UPDATE products SET name=$1, price=$2, description=$3, image_url=$4, stock_quantity=$5 WHERE id=$6",
      [name, price, description, image_url, stock_quantity, id],
    );
    res.json({ message: "Product updated!" });
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).send("Error updating product");
  }
});

app.get("/api/admin/orders", async (req, res) => {
  try {
    // Παίρνουμε τα πάντα απευθείας από τον πίνακα orders
    // Δεν χρειαζόμαστε το JOIN με τους users πλέον
    const result = await db.query(`
      SELECT * FROM orders 
      ORDER BY created_at DESC
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error("Orders SQL Error:", err);
    res.status(500).json({ error: "Αποτυχία ανάκτησης παραγγελιών" });
  }
});


app.put("/api/admin/orders/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.query("UPDATE orders SET status = $1 WHERE id = $2", [status, id]);
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
