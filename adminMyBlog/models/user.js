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
    },
    detailedInformation:{
        desc:{
            type: String,
            default: '这个人很懒，还什么都没有留下'
        },
        company:{
            type: String,
            default: '暂无'
        },
        company:{
            type: String,
            default: '暂无'
        },
        job:{
            type: String,
            default: '暂无'
        }
    },
    colarticles:Array,
    
}, {versionKey: false})

module.exports = mongoose.model("user", user)