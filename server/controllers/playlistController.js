import asyncHandler from 'express-async-handler';
import Playlist from '../models/playlistModel.js';

const addPlaylist = asyncHandler(async (req, res) => {
    const { name, type, userId, channelId, about } = req.body;
    const playlistExists = await Playlist.findOne({ name, user: userId });
    // For every user playlist name should be unique.However a user can create playlist with a name 
    // that some other user already have. 
    if (playlistExists) {
        res.status(400);
        throw new Error("You already have a playlist with same name.")
    }

    const playlist = await Playlist.create({ name, type, user: userId, channel: channelId, about });

    if (playlist) {
        res.status(201).json(playlist);
    } else {
        res.status(400)
        throw new Error("Invalid data.")
    }
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const data = {};
    if (req.body.id) {
        data["id"] = req.body.id;
    } else {
        res.status(400);
        throw new Error("Playlist id is required.");
    }
    if (req.body.name) data["name"] = req.body.name;
    if (req.body.about) data["about"] = req.body.about;

    const playlist = await Playlist.updateOne({ id: req.data.id }, { $set: data }, { upsert: false });
    if (playlist) {
        res.status(200).json(playlist);
    } else {
        res.status(400);
        throw new Error("Invalid data.");
    }
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        throw new Error("Playlist id is required.");
    }

    await Playlist.deleteOne(id);
    res.status(200);
});

const getPlaylistDetails = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        throw new Error("Playlist id is required.");
    }

    const playlist = await Playlist.findById(id);
    res.status(200).json(playlist);
})

const getPlaylistsByUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        res.status(400);
        throw new Error("User id is required.");
    }
    const playlists = await Playlist.find({ user: userId }, { name: 1, about: 1 });
    res.status(200).json(playlists);
});

const getPlaylistsByChannel = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    if (!channelId) {
        res.status(400);
        throw new Error("Channel id is required.");
    }
    const playlists = await Playlist.find({ channel: channelId }, { name: 1, about: 1 });
    res.status(200).json(playlists);
});

export {
    addPlaylist,
    updatePlaylist,
    deletePlaylist,
    getPlaylistDetails,
    getPlaylistsByUser,
    getPlaylistsByChannel
}