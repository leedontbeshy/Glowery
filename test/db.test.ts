import { pool } from "../config/database";

async function testDB() {
  console.log("Checking database connection...");
  console.log("NODE_ENV =", process.env.NODE_ENV);

  try {
    const result = await pool.query("SELECT * FROM CATEGORIES");
    console.log("Connected at:", result.rows[0]);
    console.log("hẹ hẹ hẹ");
    
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    pool.end(); // đóng kết nối để chương trình không treo
  }
}

testDB();