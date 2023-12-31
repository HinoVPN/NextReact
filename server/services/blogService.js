const Blog = require('../models/blogModel')

class BlogService{
    constructor(){
        this.auth = require('../middlewares/auth')
    }

    async createBlog(req, res){
        const inValid = await this.auth.checkUserAndToken(req.body.userId, req.headers.authorization?.split(' ')[1])
        if(inValid){
            return {status: 403, data: inValid}
        }

        const blog = await new Blog({
            user: req.body.userId,
            blogTitle: req.body.blogTitle,
            blogContent: req.body.blogContent,
            blogImage: req.body.blogImage,
            blogTags: req.body.blogTags,
            blogCategory: req.body.blogCategory,
        })

        try{
            const newBlog = await blog.save()
            return {status: 200, data: newBlog}
        }catch(err){
            return {status: 500, data: err.message}
        }
    }

    async getUserBlogs(req, res){ 
        const inValid = await this.auth.checkUserAndToken(req.body.userId, req.headers.authorization?.split(' ')[1])
        if(inValid){
            return {status: 403, data: inValid}
        }
        
        try{
            const blogs = await Blog.find({ user: req.body.userId }).exec();
            return {status: 200, data: blogs}
        }catch(err){
            return {status: 500, data: err.message}
        }
    }

    async getAllBlogs(req, res){ 
        const inValid = await this.auth.checkUserAndToken(req.headers._id, req.headers.authorization?.split(' ')[1])
        if(inValid){
            return {status: 403, data: inValid}
        }
        
        try{
            const blogs = await Blog.find({}).exec();
            return {status: 200, data: blogs}
        }catch(err){
            return {status: 500, data: err.message}
        }
    }

    async getBlogById(req, res){
        const inValid = await this.auth.checkUserAndToken(req.headers._id, req.headers.authorization?.split(' ')[1])
        if(inValid){
            return {status: 403, data: inValid}
        }

        const blog = await Blog.findOne({_id: req.body._id}).exec();

        if(blog){
            return {status: 200, data: blog}
        }
        return {status: 404, data: "Blog not found"}
    }
}

module.exports = BlogService