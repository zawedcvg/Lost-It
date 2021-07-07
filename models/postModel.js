const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
        },
        isLost: {
            type: Boolean,
            required: [
                true,
                "Please specify whether the item was something you lost, or something you found?",
            ],
            default: true,
        },
        img: {
            type: Array,
        },
        date: {
            type: Date,
            required: [true, "Please specify the date of occurence"],
        },
        location: {
            type: String,
            required: [true, "Please specify the location of the item"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: "user",
            },
        ],
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("post", postSchema);
