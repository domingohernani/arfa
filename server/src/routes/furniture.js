import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all model
router.get("/getAllFurnitures", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM furniture");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
