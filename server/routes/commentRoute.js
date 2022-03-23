import express from 'express';
import protect from '../middlewares/authMiddleware';
import {
    addComment,
    removeComment,
    updateComment,
    likeComment,
    dislikeComment,
    addSubcomment,
    removeSubcomment,
    updateSubcomment,
    likeSubcomment,
    dislikeSubcomment,
    getCommentsByVideo,
    getSubcommentsByComment
} from '../controllers/commentController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addComment);
router.put('/', protect, updateComment);
router.delete('/:id', protect, removeComment);
router.post('/like', protect, likeComment);
router.post('/dislike', protect, dislikeComment);
// While creating API we need to check can we use same API for both like and dislike.
// 'dislike' api should be deleted if it is possible and same for subcomment like and dislike also.
router.post('/subcomment', protect, addSubcomment);
router.put('/subcomment', protect, updateSubcomment);
router.delete('/subcomment/:id', protect, removeSubcomment);
router.post('/subcomment/like', protect, likeSubcomment);
router.post('/subcomment/dislike', protect, dislikeSubcomment);
router.get('/:videoId', getCommentsByVideo);
router.get('/:videoId/:commentId', getSubcommentsByComment);

export default router;