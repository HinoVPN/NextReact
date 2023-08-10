const BlogService = require("../services/blogService");

class BlogController{
    constructor(){
        this.blogService = new BlogService();
    }

    async getAllBlogs(req, res){
        return await this.blogService.getAllBlogs(req, res);
    }

    async getUserBlogs(req, res){
        return await this.blogService.getUserBlogs(req, res);
    }

    async createBlog(req, res){
        return await this.blogService.createBlog(req, res);
    }

    async getBlogById(req, res){
        return await this.blogService.getBlogById(req, res);
    }

    
}

module.exports = BlogController