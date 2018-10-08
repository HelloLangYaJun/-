const {Router} = require("express");
const router = Router();
const user = require('../models/user')
const message = require('../models/message')
const articles=require('../models/articles')
router.get('/', (req, res) => {
        if (req.session.user) {
            // let userMsg =req.session.user
            res.json({
                code: 200,
                data: req.session.user,
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


//判断是否是本人
router.get('/user/:id', (req, res) => {
    if (req.session.user) {
        let userMsg =req.session.user
        if(req.params.id==req.session.user._id)
        {
            res.json({
                code: 200,
                data: userMsg,
                msg: '本人'
            })
        }
        else{
            user.findOne({_id:req.params.id},{password:0}).then(data=>{
                res.json({
                    code: 200,
                    data,
                    msg: '非本人'
                })
            })  
        }
     
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
            console.log(req.session.user)
            let userMsg = {
                username: data.username,
                email: data.email,
                avatar: data.avatar
            };
            res.json({
                code: 200,
                data,
                msg: '登录成功'
            })
        }

    })
})

router.delete('/logOut', (req, res) => {
    console.log(req.session.user)
    user.update({_id:req.session.user._id},{})
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

//收藏或取消收藏笔记
router.put('/user/articles/:id',(req,res)=>{
    let {isCollection}=req.body
   var col=function(){
    user.update({_id:req.session.user._id},{$push:{colarticles:req.params.id}},function(err,data){
        user.find({_id:req.session.user._id}).then(data2=>{
            req.session.user=data2[0]
        })
         if(err){console.log(err)}
         else{
             articles.update({_id:req.params.id},{$inc:{likenums:1}},function(err,data3){
                 if(err){console.log(err)}
                 else{
                     res.json({
                         code: 200,
                         msg: '收藏成功'
                     })
                 }
             })
            
         }
     })
   }
   var uncol=function(){
    user.update({_id:req.session.user._id},{$pull:{colarticles:item}},function(err,data){
        if(err){console.log(err)}
        else{
            console.log('7')
            user.find({_id:req.session.user._id}).then(data2=>{
                req.session.user=data2[0]
                console.log('8')
            })
            articles.update({_id:req.params.id},{$inc:{likenums:-1}},function(err,data2){
                if(err){console.log(err)}
                else{
                    console.log('3')
                  return  res.json({
                        code: 200,
                        msg: '取消收藏成功'
                    })
                }
            })
        }
    })
   }
    if(req.session.user){
       if(isCollection){
           uncol()
       }
       else{
           col()
       }
    }
    else{
        res.json({
            code: 402,
            msg: '未登录'
        })
    }
})  
//修改用户图片
router.put('/user', (req, res) => {
    let {avatar} = req.body;
    if(req.session.user){
        user.update({_id:req.session.user._id},{$set:{avatar:avatar}},function(err,data){
            if(err){
                console.log(err)
            }
            else{
                message.update({"authorMsg._id":req.session.user._id},{$set:{"authorMsg.avatar":avatar}},function(err,data2){
                    if(err){ console.log(err)}
                    else{
                        req.session.user = data;
                        console.log(data2)
                        res.json({
                            code: 200,
                            msg: '修改成功'
                        }) 
                    }
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
