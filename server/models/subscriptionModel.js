import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Channel'
        }
    }
)

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;