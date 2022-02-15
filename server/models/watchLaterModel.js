import mongoose from 'mongoose'

const watchLaterSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        video: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Video'
        }
    }
)

const WatchLater = mongoose.model('WatchLater', watchLaterSchema);

export default WatchLater;