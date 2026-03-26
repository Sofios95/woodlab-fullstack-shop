import pg from "pg";
const { Pool } = pg;


const db: pg.Pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


db.on('connect', () => {
  console.log("🗄️ Database connected successfully!");
});

db.on('error', (err) => {
  console.error("❌ Unexpected error on idle client", err);
  process.exit(-1);
});

export default db;