import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all model
router.get("/getAllImages", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM image");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
