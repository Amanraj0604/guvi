const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    cnfpassword:{
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type:String,
    },
    dob:{
         type:String,
    },
    city:{
        type:String,
    },
    gender:{
        type:String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
