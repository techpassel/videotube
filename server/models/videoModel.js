import mongoose from 'mongoose';
import { VideoType } from '../constants/enums.js';

const videoTypes = Object.values(VideoType);

const videoSchema = mongoose.Schema(
    {
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Channel'
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        types : {
            type: [String],
            enum: videoTypes
        },
        playlist: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Playlist'
        },
        videoUrl: {
            type: String,
            required: true
        },
        thumbnailUrl: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            default: 0,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Video = mongoose.model('Video', videoSchema);
export default Video;