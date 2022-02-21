import asyncHandler from 'express-async-handler';
import Playlist from '../models/playlistModel.js';
import mongoose from 'mongoose';

const addPlaylist = asyncHandler(async (req, res) => {
    let { name, type, accessType, userId, channelId, about } = req.body;
    const playlistExists = await Playlist.findOne({ name, user: userId });
    // For every user playlist name should be unique.However a user can create playlist with a name 
    // that some other user already have. 
    if (playlistExists) {
        res.status(400);
        throw new Error("You already have a playlist with same name.")
    }

    const playlist = await Playlist.create({ name, type, accessType, user: userId, channel: channelId, about });

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
    if (req.body.accessType) data["accessType"] = req.body.accessType;

    const playlist = await Playlist.findOneAndUpdate({ id: req.body.id }, { $set: data }, { new: true, upsert: false });
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

    await Playlist.deleteOne({ id });
    res.status(200).send();
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
    // const playlists = await Playlist.find({ user: userId }, { name: 1, about: 1 });
    const playlists = await Playlist.aggregate([
        {
            $match: { user: mongoose.Types.ObjectId(userId) }
        },
        {
            $lookup: {
                from: 'channels',
                localField: 'channel',
                foreignField: '_id',
                as: 'channel'
            }
        },    
        {
            $unwind: { path: "$channel", preserveNullAndEmptyArrays: true }
        },
        {
            $project: { "name": 1, "type": 1, "accessType": 1, "user": 1, "about": 1, "channel._id": 1, "channel.name": 1 }
        }
        /*
        $unwind :- Deconstructs an array field from the input documents to output a document for each element,
        If we don't use $unwind then in result 'channel' will be in array format.But we know that any playlist will have maximum 1 channel only.
        So wouldn't it be better if we convert arry into object format? For that purpose only here we are using $unwind.
        And also note that if we don't set "preserveNullAndEmptyArrays as true" then all playlists which doesn't have channel will be ignored.
        But we know that for all "User playlist" type playlists, channel will be empty, so we need to set "preserveNullAndEmptyArrays as true".
        */
    ]);
    res.status(200).json(playlists);
});

const getPlaylistsByChannel = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    if (!channelId) {
        res.status(400);
        throw new Error("Channel id is required.");
    }
    const playlists = await Playlist.find({ channel: channelId }, { name: 1, about: 1, accessType: 1 });
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