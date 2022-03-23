import asyncHandler from 'express-async-handler';

const addComment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
}) 

const removeComment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

const updateComment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

const likeComment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

const dislikeComment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

const addSubcomment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

const removeSubcomment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

const updateSubcomment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

const likeSubcomment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

const dislikeSubcomment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

const getCommentsByVideo = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

const getSubcommentsByComment = asyncHandler(async (req, res) => {
    res.status(201).json("data");
})

export {
    addComment,
    removeComment,
    updateComment,
    likeComment,
    dislikeComment,
    addSubcomment,
    removeSubcomment,
    updateSubcomment,
    likeSubcomment,
    dislikeSubcomment,
    getCommentsByVideo,
    getSubcommentsByComment
}