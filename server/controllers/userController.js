const UserService = require("../services/userService");

class UserController{
    constructor(){
        this.userService = new UserService();
    }

    async getAllUsers(req, res){
        return await this.userService.getAllUsers(req, res);
    }

    async registerUser(req, res){
        return await this.userService.registerUser(req, res);
    }

    async loginUser(req, res){
        return await this.userService.loginUser(req, res);
    }

    async getUserProfile(req, res){
        return await this.userService.getUserProfile(req, res);
    }


}

module.exports = UserController