const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{type: String , require: true},
        email:{type: String , require: true, unique: true},
        password:{type: String , require: true},
        role:{
            type: String,
            enum: ["USER", "SUPPORT", "MANAGER"],
            default: "USER",
        },
    },
    {timestamps: true},
);
module.exports = mongoose.model("USER", userSchema);