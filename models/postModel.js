const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        content: String,
        images: {
            type: Array,
            required: true,
        },
        likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
        user: { type: mongoose.Types.ObjectId, ref: "user" },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("post", postSchema);
