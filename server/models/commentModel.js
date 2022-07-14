import mongoose from 'mongoose';

const subCommentSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        dislikes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
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
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        dislikes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        subcomments: [subCommentSchema]
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;