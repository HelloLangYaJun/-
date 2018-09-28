const {Router} = require("express")
const router = Router()
const path = require('path')

const login = require('./users')
const articles = require('./articles')
// router.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../views/index.html'));
// })
router.use(login);
router.use(articles);

module.exports = router;