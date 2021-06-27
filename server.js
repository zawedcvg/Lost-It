const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/userRouter.js");
const upload = require("./routes/upload.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

app.use("/user", userRouter);
app.use("/api", upload);

const URI = process.env.MONGODB_URL;
mongoose.connect(
    URI,
    {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("mongodb connected");
    }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

app.get("/", function (req, res) {
    res.send("<html><body><h1>Hello World</h1></body></html>");
});
