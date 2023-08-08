const BlogService = require("../services/blogService");

class BlogController{
    constructor(){
        this.blogService = new BlogService();
    }

    async getUserBlog(req, res){
        return await this.blogService.getUserBlog(req, res);
    }

    async createBlog(req, res){
        return await this.blogService.createBlog(req, res);
    }

    
}

module.exports = BlogController