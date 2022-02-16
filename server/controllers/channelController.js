import asyncHandler from 'express-async-handler';
import Channel from '../models/channelModel.js';

const addChannel = asyncHandler(async (req, res) => {
    const { name, about, userId } = req.body;
    const profileImage = req.files.profileImage[0].path;
    const bannerImage = req.files.bannerImage[0].path;
    
    const channelsExists = await Channel.findOne({ name });
    if (channelsExists) {
        res.status(400)
        throw new Error("Channel name already exist.");
    }

    const channel = await Channel.create({ name, about, user: userId, profileImage, bannerImage });
    if (channel) {
        res.status(201).json(channel);
    } else {
        res.status(400)
        throw new Error("Invalid data.")
    }
});

const updateChannel = asyncHandler(async (req, res) => {
    const data = {};
    let id = null;
    if (req.body.id) {
        id = req.body.id
    } else {
        res.status(400)
        throw new Error("Channel id is required.")
    }

    if (req.body.name && req.body.name !== "") data["name"] = req.body.name;
    if (req.body.about && req.body.about !== "") data["about"] = req.body.about;
    
    const channel = await Channel.findOneAndUpdate({ _id: id }, { $set: data }, { upsert: false, new: true })
    if (channel) {
        res.json(channel)
    } else {
        res.send(400)
        throw new Error("Invalid data.")
    }
});

export {
    addChannel,
    updateChannel
}
