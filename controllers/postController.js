const Posts = require("../models/postModel");
// const Comments = require('../models/commentModel')
const Users = require("../models/userModel");

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const postController = {
    createPost: async (req, res) => {
        try {
            const { name, isLost, img, date, location, description } = req.body;

            const newPost = new Posts({
                name,
                isLost,
                img,
                date,
                location,
                description,
                user: req.user._id,
            });

            await newPost.save();

            res.json({
                msg: "Created Post!",
                newPost: {
                    ...newPost._doc,
                    user: req.user,
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getPosts: async (req, res) => {
        try {
            const features = new APIfeatures(
                Posts.find(),
                req.query
            ).paginating();

            const posts = await features.query.sort("-createdAt");

            res.json({
                msg: "Success!",
                result: posts.length,
                posts,
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },
    updatePost: async (req, res) => {
        try {
            let { name, isLost, img, date, location, description } = req.body;

            const postTobeUpdated = await Posts.findById({
                _id: req.params.id,
            });

            if (name == null || name == "") {
                name = postTobeUpdated.name;
            }

            if (isLost == null || isLost == "") {
                isLost = postTobeUpdated.isLost;
            }

            if (img == null || img == "") {
                img = postTobeUpdated.img;
            }

            if (date == null || date == "") {
                date = postTobeUpdated.date;
            }

            if (location == null || location == "") {
                location = postTobeUpdated.location;
            }

            if (description == null || description == "") {
                description = postTobeUpdated.description;
            }

            const post = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                {
                    name,
                    isLost,
                    img,
                    date,
                    location,
                    description,
                }
            );

            res.json({
                msg: "Updated Post!",
                updatedPost: {
                    ...post._doc,
                },
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },
    likePost: async (req, res) => {
        try {
            const post = await Posts.find({
                _id: req.params.id,
                likes: req.user._id,
            });

            if (post.length > 0) {
                return res
                    .status(400)
                    .json({ msg: "You already liked this post." });
            }

            const like = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: { likes: req.user._id },
                },
                { new: true }
            );

            if (!like) {
                return res.status(400).json({
                    msg: "This post does not exist.",
                });
            }

            res.json({
                msg: "Liked Post!",
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },
    unLikePost: async (req, res) => {
        try {
            const like = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: { likes: req.user._id },
                },
                { new: true }
            );

            if (!like)
                return res
                    .status(400)
                    .json({ msg: "This post does not exist." });

            res.json({ msg: "Unliked Post!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const features = new APIfeatures(
                Posts.find({ user: req.params.id }),
                req.query
            ).paginating();

            const posts = await features.query.sort("-createdAt");

            res.json({
                posts,
                result: posts.length,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id).exec();

            if (!post)
                return res
                    .status(400)
                    .json({ msg: "This post does not exist." });

            res.json({
                post,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deletePost: async (req, res) => {
        try {
            const post = await Posts.findOneAndDelete({
                _id: req.params.id,
                user: req.user._id,
            });

            res.json({
                msg: "Deleted Post!",
                newPost: {
                    ...post,
                    user: req.user,
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    savePost: async (req, res) => {
        try {
            console.log(req.body);
            const user = await Users.find({
                _id: req.body.user._id,
                saved: req.params.id,
            });

            if (user.length > 0)
                return res.status(400).json({ msg: "You saved this post." });

            const save = await Users.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: { saved: req.params.id },
                },
                { new: true }
            );

            if (!save)
                return res
                    .status(400)
                    .json({ msg: "This user does not exist." });

            res.json({ msg: "Saved Post!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    unsavePost: async (req, res) => {
        try {
            console.log(req.body);
            const user = await Users.find({
                _id: req.body.user._id,
                saved: req.params.id,
            });

            if (user.length > 0)
                return res.status(400).json({ msg: "You saved this post." });

            const unsave = await Users.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $pull: { saved: req.params.id },
                },
                { new: true }
            );

            if (!unsave)
                return res
                    .status(400)
                    .json({ msg: "This user does not exist." });

            res.json({ msg: "unsaved Post!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getSavedPosts: async (req, res) => {
        try {
            console.log(req.user);
            // console.log(req.body);
            const features = new APIfeatures(
                Posts.find({
                    _id: { $in: req.user.saved },
                }),
                req.query
            ).paginating();

            const savedPosts = await features.query.sort("-createdAt");

            res.json({
                savedPosts,
                result: savedPosts.length,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    changeStatus : async (req, res) => {
        try {
            const post_id = req.body.post;
            const change = await Posts.findOneAndUpdate(
                {_id : post_id},
                {
                    isLost : false
                }
            )

            if (!change) {
                return res.status(400).json({ 
                        msg: "This post does not exist." 
                    });
            }

            res.json({
                msg : "Changed Status"
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    revertStatus : async (req, res) => {
        try {
            const post_id = req.body.post;
            const change = await Posts.findOneAndUpdate(
                {_id : post_id},
                {
                    isLost : true
                }
            )

            if (!change) {
                return res.status(400).json({ 
                        msg: "This post does not exist." 
                    });
            }

            res.json({
                msg : "Changed Status (revert)"
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = postController;
