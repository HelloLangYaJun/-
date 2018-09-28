const {Router} = require("express")
const router = Router()
const path = require('path')

const login = require('./users')
const articles = require('./articles')
const messages = require('./messages')

router.use(login);
router.use(articles);
router.use(messages)

module.exports = router;