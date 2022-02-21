import express from "express";
import {
    addChannel,
    deleteChannel,
    updateChannel,
    updateProfileImage,
    updateBannerImage,
    getChannelsByUser,
    deleteProfileImage,
    deleteBannerImage
} from "../controllers/channelController.js";
import protect from "../middlewares/authMiddleware.js";
import multer from "multer";
import { generateFileName } from "../utils/commonUtil.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp')
    },
    filename: function (req, file, cb) {
        const uniqueName = generateFileName(req, file)
        cb(null, uniqueName)
    }
});

const upload = multer({ storage: storage })

const router = express.Router();

router.post("/", protect, upload.fields([{ name: "profileImage", maxCount: 1 }, { name: "bannerImage", maxCount: 1 }]), addChannel);
router.put("/", protect, updateChannel);
router.delete("/:id", protect, deleteChannel);
router.put("/profile-image/", protect, upload.single('profileImage'), updateProfileImage);
router.put("/banner-image/", protect, upload.single('bannerImage'), updateBannerImage);
router.delete("/profile-image/:id", protect, deleteProfileImage);
router.delete("/banner-image/:id", protect, deleteBannerImage);
router.get("/by-user/:userId", protect, getChannelsByUser);

export default router;