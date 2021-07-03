const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/userRouter");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/express_backend", (req, res) => {
    res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
});
