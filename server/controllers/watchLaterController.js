import asyncHandler from 'express-async-handler';
import WatchLater from '../models/watchLaterModel';

const addWatchLater = asyncHandler(async (req, res) => {
    const { userId, videoId } = req.body;
    const watchLater = await WatchLater.create({ user: userId, video: videoId });
    if (watchLater) {
        res.status(201).json(watchLater);
    } else {
        res.status(400);
        throw new Error("Invalid data.");
    }
})

const deleteWatchLater = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.send(400);
        throw new Error("Watch later id is required.");
    }
    await WatchLater.deleteOne({ id });
    res.status(200).send();
})

const getUserWatchLater = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const watchLaters = await WatchLater.aggregate([
        { $match: { user: userId } },
        {
            $lookup: {
                from: 'videos',
                localField: 'video',
                foreignField: '_id',
                as: 'video'
            }
        },
        { $unwind: { path: '$video', preserveNullAndEmptyArrays: true } },
        { $project: { 'user': 1, 'video._id': 1, 'video.title': 1, 'video.thumbnailUrl': 1, 'video.videoUrl': 1 } }
    ]);
    res.status(200).json(watchLaters);
})

export {
    addWatchLater,
    deleteWatchLater,
    getUserWatchLater
}