const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    avatar: {
        type: String,
        default: 'http://pic.eastlady.cn/uploads/tp/201604/64/38.jpg'
    }
}, {versionKey: false})

module.exports = mongoose.model("user", user)