import express from 'express';
import { addPlaylist, deletePlaylist, getPlaylistDetails, getPlaylistsByChannel, getPlaylistsByUser, updatePlaylist } from '../controllers/playlistController.js';
import protect from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post("/", protect, addPlaylist);
router.put("/", protect, updatePlaylist);
router.delete("/:id", protect, deletePlaylist);
router.get("/:id", getPlaylistDetails);
router.get("/by-user/:userId", getPlaylistsByUser);
router.get("/by-channel/:channelId", getPlaylistsByChannel)

export default router;