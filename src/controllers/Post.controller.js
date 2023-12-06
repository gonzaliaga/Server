const Post = require('../models/Post.model')

const createPost = async (req, res) => {
    try {
        const post = new Post (req.body)
        const resp = await post.save()
        return res.json({
            massage: 'Post was created successfully',
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

const getPosts = async (req, res) => {
    try {
        const resp = await Post.find()
            .populate('category')
            .populate('user')
        return res.json({
            message: "Posts",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const newData = req.body
        const resp = await Post.findByIdAndUpdate(
            newData.postId,
            { $set: newData },
            { new: true })
        return res.json({
            massage: "Post was update successfully",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const resp = await Post.findByIdAndDelete(req.body.postId)
        return res.json({
            massage: "Post was deleted successfully",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

module.exports = { 
    createPost, 
    getPosts, 
    updatePost, 
    deletePost 
}