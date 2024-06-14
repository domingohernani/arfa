import express from "express";
import { getAllModels } from "../models/model.js";

const router = express.Router();

router.get("/", (req, res) => {
  getAllModels((err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

export default router;