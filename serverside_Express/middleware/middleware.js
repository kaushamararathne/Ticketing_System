// routes/admin.js
import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/admin-data", authenticate, authorize("admin"), (req, res) => {
  res.json({
    message: "This is confidential admin-only data.",
    users: ["user1", "user2", "user3"],
  });
});

export default router;
