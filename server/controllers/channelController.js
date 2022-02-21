import asyncHandler from 'express-async-handler';
import Channel from '../models/channelModel.js';
import {uploadFile, deleteFile} from '../utils/fileUpload.js';

const addChannel = asyncHandler(async (req, res) => {
    const { name, about, userId } = req.body;
    const channelsExists = await Channel.findOne({ name });
    if (channelsExists) {
        res.status(400);
        throw new Error("Channel name already exist.");
    }
    let profileImage = req.files.profileImage[0].path;
    let bannerImage = req.files.bannerImage[0].path;
    profileImage = await uploadFile(profileImage, "channel-related");
    bannerImage = await uploadFile(bannerImage, "channel-related");
    // Promise.all([promise1, promise2]).then(value => {
    //     console.log(value, "vavavavavavavav");
    //     res.send(value);
    // })
    const channel = await Channel.create({ name, about, user: userId, profileImage, bannerImage });
    if (channel) {
        res.status(201).json(channel);
    } else {
        res.status(400);
        throw new Error("Invalid data.");
    }
});

const updateChannel = asyncHandler(async (req, res) => {
    const data = {};
    let id = null;
    if (req.body.id) {
        id = req.body.id;
    } else {
        res.status(400);
        throw new Error("Channel id is required.");
    }

    if (req.body.name && req.body.name !== "") data["name"] = req.body.name;
    if (req.body.about && req.body.about !== "") data["about"] = req.body.about;

    const channel = await Channel.findOneAndUpdate({ _id: id }, { $set: data }, { upsert: false, new: true });
    if (channel) {
        res.status(200).json(channel);
    } else {
        res.status(400);
        throw new Error("Invalid data.");
    }
});

const deleteChannel = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400)
        throw new Error("Channel id is required.")
    }

    await Channel.deleteOne({id});
    res.status(200).send();    
});

const updateProfileImage = asyncHandler(async (req, res) => {
    const channelId = req.body.id;
    const channel = await Channel.findById(channelId);
    if(!channel){
        res.status(400);
        throw new Error("Channel not found.");
    }
    let profileImage  = req.file.path;
    profileImage = await uploadFile(profileImage, "channel-related");
    if(channel.profileImage && channel.profileImage !== "") await deleteFile(channel.profileImage);
    const updatedChannel = await Channel.findOneAndUpdate({id: channelId}, {$set: {profileImage}}, {new: true, upsert: false});
    res.status(200).json(updatedChannel);
})

const updateBannerImage = asyncHandler(async (req, res) => {
    const channelId = req.body.id;
    const channel = await Channel.findById(channelId);
    if(!channel){
        res.status(400);
        throw new Error("Channel not found.");
    }
    let bannerImage  = req.file.path;
    bannerImage = await uploadFile(bannerImage, "channel-related");
    if(channel.bannerImage && channel.bannerImage !== "") await deleteFile(channel.bannerImage);
    const updatedChannel = await Channel.findOneAndUpdate({id: channelId}, {$set: {bannerImage}}, {new: true, upsert: false});
    res.status(200).json(updatedChannel);
})

const deleteProfileImage = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const channel = await Channel.findById(id);
    if(!channel){
        res.status(400);
        throw new Error("Channel not found.");
    }
    if(channel.profileImage && channel.profileImage !== "") await deleteFile(channel.profileImage);
    const updatedChannel = await Channel.findOneAndUpdate({id: id}, {$set: {profileImage: null}}, {new: true, upsert: false});
    res.status(200).json(updatedChannel);
})

const deleteBannerImage = asyncHandler(async (req, res) => {
    //https://techpassel-bucket.s3.ap-south-1.amazonaws.com/
    const id = req.params.id;
    const channel = await Channel.findById(id);
    if(!channel){
        res.status(400);
        throw new Error("Channel not found.");
    }
    if(channel.bannerImage && channel.bannerImage !== "") await deleteFile(channel.bannerImage);
    const updatedChannel = await Channel.findOneAndUpdate({id: id}, {$set: {bannerImage: null}}, {new: true, upsert: false});
    res.status(200).json(updatedChannel);
})

const getChannelsByUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const channels = await Channel.find({user: userId})
    return res.status(200).json(channels);
})

export {
    addChannel,
    updateChannel,
    deleteChannel,
    updateProfileImage,
    updateBannerImage,
    getChannelsByUser,
    deleteProfileImage,
    deleteBannerImage
}