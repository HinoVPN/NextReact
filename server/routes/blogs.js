var express = require('express');
var router = express.Router();
const BlogController = new (require('../controllers/blogController'))();

router.get('/', function(req, res, next) {
    res.json({message: "All Blog Shown"})
});

router.post('/userBlog', async function(req, res, next) {
    const result = await BlogController.getUserBlog(req, res)
    res.status(result.status).json(result.data)
});

router.post('/create', async function(req, res, next) {
    const result = await BlogController.createBlog(req, res)
    res.status(result.status).json(result.data)
});

module.exports = router;