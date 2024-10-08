const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route.js");
const ApiError = require("./app/api-error.js")
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.json({message: "Welcome to contact book application."});
});
app.use("/api/contacts", contactsRouter);
// handle 404 response
app.use((req, res, next) => {
    // Code o day se chay khi khong co route duoc dinh nghia nao
    // khop voi yeu cau. Goi next() de chuyen sang middleware xu ly loi
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) =>{
    // Middleware xu ly loi tap trung.
    // Trong cac doan code xu ly o cac route, goi next(error) se chuyen ve middleware xu ly loi nay
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});



module.exports = app;