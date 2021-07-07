const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
            maxlength: 25,
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
        },
        role: {
            type: Number,
            default: 0,
        },
        avatar: {
            type: String,
            default: "",
        },
        saved: [
            {
                type: mongoose.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
