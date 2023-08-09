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

    async getUserBlog(req, res){ 
        console.log(1)
        const inValid = await this.auth.checkUserAndToken(req.body.userId, req.headers.authorization?.split(' ')[1])
        if(inValid){
            return {status: 403, data: inValid}
        }
        
        try{
            const blogs = await Blog.find({ user: req.body.userId }).exec();
            return {status: 200, data: {blogs: blogs}}
        }catch(err){
            return {status: 500, data: err.message}
        }
        


    }
}

module.exports = BlogService