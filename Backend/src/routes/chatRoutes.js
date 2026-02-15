import express from "express";
import { getStreamToken } from "../controllers/chatControllers.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/token", protectedRoute, getStreamToken);

export default router;
