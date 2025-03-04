const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authroutes");
const connectToMongoDB = require("./db/connectiontoMongodb");
const messageroute = require("./routes/messageroute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userroutes = require("./routes/userroutes");
const { app, server } = require("./socket/socket");

dotenv.config();


const port = process.env.PORT || 3000;


const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectToMongoDB()
    .then(() => {
        server.listen(port, () => {
            console.log(`App running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });

app.use("/api/auth", authRoutes);
app.use("/api/message", messageroute);
app.use("/api/users", userroutes);


app.use(express.static(frontendPath));
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});
