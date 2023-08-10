var express = require('express');
var router = express.Router();
const BlogController = new (require('../controllers/blogController'))();

router.get('/', async function(req, res, next) {
    const result = await BlogController.getAllBlogs(req, res)
    res.status(result.status).json(result.data)
});

router.post('/userBlog', async function(req, res, next) {
    const result = await BlogController.getUserBlogs(req, res)
    res.status(result.status).json(result.data)
});

router.post('/create', async function(req, res, next) {
    const result = await BlogController.createBlog(req, res)
    res.status(result.status).json(result.data)
});

router.post('/getBlogById', async function(req, res, next) {
    const result = await BlogController.getBlogById(req, res)
    res.status(result.status).json(result.data)
});

module.exports = router; 