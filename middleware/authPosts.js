const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authPosts = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(400).json({ 
                msg: "Invalid Authentication." 
            });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decoded) {
            return res.status(400).json({ 
                msg: "Invalid Authentication." 
            });
        }

        // console.log("**********");
        // console.log(decoded);

        const user = await Users.findOne({ 
            _id: decoded.id 
        });

        // console.log(user);

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ 
            msg: err.message 
        });
    }
};

module.exports = authPosts;
