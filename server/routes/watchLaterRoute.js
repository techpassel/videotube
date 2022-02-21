import express from "express";
import protect from "../middlewares/authMiddleware";
import {addWatchLater, deleteWatchLater, getUserWatchLater} from '../controllers/watchLaterController.js';

const router = express.Router();

router.post("/", protect, addWatchLater);
router.delete("/:id", protect, deleteWatchLater);
router.get("/:userId", protect, getUserWatchLater);

export default router;