import mongoose from 'mongoose';

const subCommentSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false
        },
        dislikes: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false
        },
    },
    {
        timestamps: true
    }
)

const commentSchema = mongoose.Schema(
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
        },
        text: {
            type: String,
            required: true
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false
        },
        dislikes: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false
        },
        subcomment: [subCommentSchema]
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;