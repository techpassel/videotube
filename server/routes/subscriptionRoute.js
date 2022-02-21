import express from "express";
import protect from "../middlewares/authMiddleware";
import { addSubscription, deleteSubscription, getUserSubscriptions } from '../controllers/subscriptionController.js';
const router = express.Router();

router.post("/", protect, addSubscription);
router.delete("/:id", protect, deleteSubscription);
router.get("/:userId", protect, getUserSubscriptions);

export default router;