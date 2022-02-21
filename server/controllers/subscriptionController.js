import asyncHandler from 'express-async-handler';
import Subscription from '../models/subscriptionModel';
const addSubscription = asyncHandler(async (req, res) => {
    const { userId, channelId } = req.body;
    const subscription = await Subscription.create({ user: userId, channel: channelId });
    if (subscription) res.status(201).json(subscription);
    else {
        res.status(400);
        throw new Error("Invalis data.");
    }
});

const deleteSubscription = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400)
        throw new Error("Subscription id is required.")
    }
    await Subscription.deleteOne({ id });
    res.status(200).send()
});

const getUserSubscriptions = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const subscriptions = await Subscription.aggregate([
        { $match: { user: userId } },
        {
            $lookup: {
                from: 'channels',
                localField: 'channel',
                foreignField: '_id',
                as: 'channel'
            }
        },
        { $unwind: { path: '$channel', preserveNullAndEmptyArrays: true } },
        {
            $project: { 'user': 1, 'channel._id': 1, 'channel.name': 1 }
        }
    ]);
    res.status(200).json(subscriptions);
});

export {
    addSubscription,
    deleteSubscription,
    getUserSubscriptions
}
