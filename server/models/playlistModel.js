import mongoose from 'mongoose'
import { PlaylistType, AccessType } from '../constants/enums.js'

const playlistTypes = Object.values(PlaylistType);
const accessTypes = Object.values(AccessType);

const playlistSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: playlistTypes,
            required: true
        },
        accessType: {
            type: String,
            enum: accessTypes,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User'
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Channel'
        },
        about: {
            type: String,
            required: false,
        }
    }
);

//If "type" is "USER_PLAYLIST" then "user" field will be filled and "channel" field will be empty.
//And if "type" is "CHANNEL_PLAYLIST" then "channel" field will be filled and "user" field will be empty.

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;