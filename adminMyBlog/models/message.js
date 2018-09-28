const mongoose = require("mongoose");

const message = new mongoose.Schema({
    content: String,
    type: {
        type: String,
        default: 'message'
    },
    authorMsg: Object,
    toauthor:Object,
    toArticle:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'to'
    }
}, {versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("message", message)