import express from "express";
import { addChannel, updateChannel } from "../controllers/channelController.js";
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

export default router;