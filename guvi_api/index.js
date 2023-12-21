const express=require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const User=require('./routes/user');
const app=express();
app.use(cors())


require('dotenv').config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => console.error({error : "MongoDB connection error"}))

app.use(express.json());
app.use("/api/users", User);

app.listen(process.env.PORT, (req, res) => {
    console.log("Server is running on port", process.env.PORT);
});