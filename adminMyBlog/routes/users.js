const {Router} = require("express");
const router = Router();
const user = require('../models/user')
router.get('/', (req, res) => {
        if (req.session.user) {
            let userMsg =req.session.user
            res.json({
                code: 200,
                data: userMsg,
                msg: '存在登陆信息'
            })
        } 
        else{
            res.json({
                code: 401,
                msg: '不存在登陆信息'
            })
        }
})
router.post('/login', (req, res) => {
    let {email, password} = req.body;
    user.findOne({email}).then((data) => {
        if (!data) {
            res.json({
                code: 401,
                msg: '该用户名不存在'
            })
        }
        else if (data.password != password) {
            res.json({
                code: 401,
                msg: '密码不正确'
            })
        }
        else if (data.password == password) {
            req.session.user = data;
            let userMsg = {
                username: data.username,
                email: data.email,
                avatar: data.avatar
            };
            res.json({
                code: 200,
                data: userMsg,
                msg: '登录成功'
            })
        }

    })
})

router.delete('/logOut', (req, res) => {
    req.session.destroy(function (err) {
        if(err){
            console.log(err)
        }
        else {
            // res.clearCookie('sid');
            res.json({
                code: 200,
                msg: '退出登陆成功'
            })
        }
    })
})
//注册
router.post('/user', (req, res) => {
    let {username, email, password} = req.body;
    console.log(username, email, password)
    if(username&&email&&password){
        user.findOne({email:email}).then(data=>{
            if(data){
               res.json({
                   code: 401,
                   msg: '该邮箱已注册'
               })
            }
            else{
               user.create({username, email, password}).then((data) => {
                   res.json({
                       code: 200,
                       data,
                       msg: '注册成功'
                   })
               })
            }
        })
    }
    else{
        res.json({
            code: 402,
            msg: '信息填写不完整'
        })
    }
})
//修改用户图片
router.put('/user', (req, res) => {
    let {avatar} = req.body;
    console.log(avatar)
    if(req.session.user){
        user.update({_id:req.session.user._id},{$set:{avatar:avatar}},function(err,data){
            if(err){
                console.log(err)
            }
            else{
                req.session.user = data;
                res.json({
                    code: 200,
                    msg: '修改成功'
                }) 
            }
        })
    }
    else{
        res.json({
            code: 402,
            msg: '信息填写不完整'
        })
    }
})
module.exports = router;
