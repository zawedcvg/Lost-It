const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/userRouter.js");
const upload = require("./routes/upload.js");
const postRouter = require("./routes/postRouter.js");
// const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

app.get("/", function (req, res) {
    res.send("<html><body><h1>Hello World</h1></body></html>");
});

app.use("/user", userRouter);
app.use("/api", upload);
app.use("/listings", postRouter);

const URI = `${process.env.MONGODB_URL}`;
// console.log(typeof URI);
mongoose.connect(
    URI,
    {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("mongodb connected");
    }
);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("../client/build"));
// }

// if (process.env.NODE_ENV === "production") {
//     // Set static folder
//     app.use(express.static("./client/build"));

//     app.use("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});


