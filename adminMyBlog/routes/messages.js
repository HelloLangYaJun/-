const {Router} = require("express");
const router = Router();
const message = require('../models/message')

//发布评论
router.post('/message', (req, res) => {
    if(req.session.user) {
        let {content,toauthor,toArticle,type} = req.body
        message.create({
            content,
            toArticle,
            type,
            toauthor,
            authorMsg: req.session.user
        }).then(data => {
            res.json({
                code: 200,
                data,
                msg: '评论回复成功'
            })
        })
    }
    else {
        res.json({
            code: 403,
            msg: '未登录不能发布评论'
        })
    }
})
//发布回复
router.post('/message/reply', (req, res) =>{
    if(req.session.user) {
        let {content,toauthor,toArticle,type} = req.body
        message.create({
            content,
            toArticle,
            type,
            toauthor,
            authorMsg: req.session.user
        }).then(data => {
            res.json({
                code: 200,
                data,
                msg: '评论回复成功'
            })
        })
    }
    else {
        res.json({
            code: 403,
            msg: '未登录不能发布评论'
        })
    }
})


router.get('/message/:id', (req, res) =>{
        console.log(req.params.id)
        message.find({toArticle:req.params.id},{"authorMsg.password":0,"toauthor.password":0}).then(data => {
            res.json({
                code: 200,
                data,
            })
        })
    
})
module.exports = router;