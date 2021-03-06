const mongoose = require("mongoose");

const article = new mongoose.Schema({
    author: String,
    title: {
        type: String,
        index: 1
    },

    content: String,
    // contentText: String,
    looknums: {
        type: Number,
        default: 0,
    },
    likenums: {
        type: Number,
        default: 0,
    },
    commontnums: {
        type: Number,
        default: 0
    },
    tags: Array,
    authorMsg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

}, {versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("article", article)