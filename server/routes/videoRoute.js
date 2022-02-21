import express from 'express';
import protect from '../middlewares/authMiddleware';
import { addVideo, updateVideo, deleteVideo, addVideoType, removeVideoType, likeVideo, dislikeVideo } from '../controllers/protectedVideoController.js';
import { increaseVideoViewCount, getVideoDetails, getVideosByChannel, getVideosByPlaylist, getVideosByType, getReleventVideo } from '../controllers/unProtectedVideoController.js';

const router = express.Router();

router.post("/", protect, addVideo);
router.put("/", protect, updateVideo);
router.delete("/:id", protect, deleteVideo);
router.put("/type", protect, addVideoType);
router.delete("/type", protect, removeVideoType);
router.post("/like", protect, likeVideo);
router.post("/dislike", protect, dislikeVideo);
// Following apis can be accessed without login also. That's the reason why we are not using "protect" middleware in following apis. 
router.post("/", increaseVideoViewCount);
router.get("/:id", getVideoDetails);
router.get("/by-channel/:channelId", getVideosByChannel);
router.get("/by-playlist/:playlistId", getVideosByPlaylist);
router.get("/by-type/:type", getVideosByType);
router.get("/", getReleventVideo);

export default router;