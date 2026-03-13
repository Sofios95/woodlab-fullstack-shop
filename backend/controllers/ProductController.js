import db from "../config/db.js";

export const getAllProducts = async (req, res) => {
  console.log("--- Request: getAllProducts ---");
  try {
    // Δοκιμάζουμε ρητά το public schema
    const result = await db.query(`SELECT * FROM public.products`);
    console.log("✅ Success: Found", result.rows.length, "products");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ DATABASE ERROR (getAllProducts):", err.message);
    // Στέλνουμε το err.message στο frontend για να το δεις στο Inspect -> Network
    res.status(500).json({ error: err.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, image_url } = req.body;
    const result = await db.query(
      `INSERT INTO public.products (name,description,price,stock_quantity,image_url)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [name, description, price, stock_quantity, image_url]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error("❌ DATABASE ERROR (addProduct):", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, image_url, stock_quantity } = req.body;
    await db.query(
      "UPDATE public.products SET name=$1, price=$2, description=$3, image_url=$4, stock_quantity=$5 WHERE id=$6",
      [name, price, description, image_url, stock_quantity, id]
    );
    res.json({ message: "Product updated!" });
  } catch (err) {
    console.error("❌ DATABASE ERROR (updateProduct):", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM public.products WHERE id = $1", [id]);
    res.json({ message: "Product deleted!" });
  } catch (err) {
    console.error("❌ DATABASE ERROR (deleteProduct):", err.message);
    res.status(500).json({ error: err.message });
  }
};