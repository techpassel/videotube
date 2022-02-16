import mongoose from "mongoose";

const channelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        about: {
            type: String,
            required: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        profileImage: {
            type: String,
            required: false
        },
        bannerImage: {
            type: String,
            required: false
        }
    }
);

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;