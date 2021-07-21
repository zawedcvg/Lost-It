const Users = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail.js");

const CLIENT_URL = process.env.CLIENT_URL;

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            console.log(req.body);

            if (!name || !email || !password) {
                return res.status(400).json({
                    msg: "Please fill all the fields",
                });
            }

            if (!validateEmail(email)) {
                return res.status(400).json({
                    msg: "Invalid email address",
                });
            }

            const user = await Users.findOne({
                email,
            });

            if (user) {
                return res.status(400).json({
                    msg: "An account with this email already exists",
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    msg: "The password entered is too short, length must be at least 6 characters",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = {
                name,
                email,
                password: hashedPassword,
            };

            const activationToken = createActivationToken(newUser);
            const url = `${CLIENT_URL}/user/activation/${activationToken}`;
            sendMail(email, url, "Verify your email address");

            res.json({
                msg: "Mail has been sent for activation",
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body;
            const user = jwt.verify(
                activation_token,
                process.env.ACTIVATION_TOKEN_SECRET
            );

            const { name, email, password } = user;

            const check = await Users.findOne({ email });
            if (check)
                return res.status(400).json({
                    msg: "This email already exists",
                });

            const newUser = new Users({
                name,
                email,
                password,
            });

            await newUser.save();

            res.json({
                msg: "Account has been activated",
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    msg: "This email doesn't exist",
                });
            }

            // console.log(user.password + " " + password);

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    msg: "Password is incorrect",
                });
            }

            const refresh_token = createRefreshToken({
                id: user._id,
            });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/user/refresh_token",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.json({
                msg: "Login successful",
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    getAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) {
                return res.status(400).json({
                    msg: "Please login again",
                });
            }

            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err) {
                        return res.status(400).json({
                            msg: "Please login again",
                        });
                    }

                    const access_token = createAccessToken({ id: user.id });
                    res.json({ access_token, user });
                }
            );
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await Users.findOne({ email });
            if (!user)
                return res.status(400).json({
                    msg: "The email doesn't exist",
                });

            const access_token = createAccessToken({ id: user.id });
            const url = `${CLIENT_URL}/user/reset/${access_token}`;

            sendMail(email, url, "Reset your password");
            res.json({
                msg: "Change your password, email has been sent",
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    resetPassword: async (req, res) => {
        try {
            console.log(req.body)
            console.log(req.user)
            const { password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);

            await Users.findOneAndUpdate(
                { _id: req.user.id },
                {
                    password: hashedPassword,
                }
            );

            res.json({
                msg: "Password changed successfully",
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    getUserInfo: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");
            res.json(user);
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    getCompleteInfo: async (req, res) => {
        try {
            const users = await Users.find().select("-password");
            console.log(users);
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", {
                path: "/user/refresh_token",
            });

            return res.json({
                msg: "Logged out successfully",
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { name, email } = req.body;
            await Users.findOneAndUpdate(
                { _id: req.user.id },
                {
                    name,
                    email,
                }
            );

            res.json({
                msg: "User info updated successfully",
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    updateUserRole: async (req, res) => {
        try {
            const { role } = req.body;

            await Users.findOneAndUpdate(
                { _id: req.params.id },
                {
                    role,
                }
            );

            res.json({
                msg: "User role updated successfully",
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id);

            res.json({
                msg: "User account deleted successfully",
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },
};

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) =>
    jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: "10m",
    });

const createAccessToken = (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
    });

const createRefreshToken = (payload) =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });

module.exports = userController;
