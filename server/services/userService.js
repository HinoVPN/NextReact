const bcrypt = require("bcrypt")
const User = require('../models/userModel')
const Token = require('../models/tokenModel');
const tokenModel = require("../models/tokenModel");

class UserService {

    constructor() {
        this.auth = require('../middlewares/auth')
        this.saltRounds = 10;
    }

    //create a function encryptPassword that takes a password and returns a hash
    encryptPassword(password) {  
        return bcrypt.hashSync(password, this.saltRounds)
    }

    //check if password is correct
    comparePassword(password, hash) {  
        if (bcrypt.compareSync(password, hash)) {
            return true
        } else {
            return false
        }
    }

    async getAllUsers(req, res) {
        try{
            const result = await User.find();
            return result
        }catch(e){
            return {message: e.message}
        }
    }

    async registerUser(req, res) {
        try{
            const hashPassword = this.encryptPassword(req.body.password)
            const user = new User({
                username: req.body.username,
                password: hashPassword
            })
            const newUser = await user.save()
            return newUser
        }catch(e){
            return {message: "User exist"}
        }
    }

    async loginUser(req, res) {
        try{
            //find user by username
            const user = await User.findOne({username: req.body.username}).exec()
            if(!user){
                //error message
                return {status: 401, data:{message: "Unauthorized"}}
            }
            
            //compare password
            const isMatch = this.comparePassword(req.body.password, user.password)
            if(!isMatch){
                //error message
                return {status: 401, data:{message: "Unauthorized"}}
            }

            const currentToken = await tokenModel.findOne({userId: user._id})
            if(currentToken){
                return {status: 200, data:{
                    _id: user._id,
                    username: user.username,
                    accessToken: currentToken.accessToken,
                    role: user.role
                }}
            }

            let userInfo = {
                _id: user._id,
            }

            let refreshToken = this.auth.signJwt(userInfo,{ expiresIn: '24h' })
            let accessToken = this.auth.signJwt(userInfo,{ expiresIn: '100s' })
            const token = new Token({
                userId: user._id,
                refreshToken: refreshToken,
                accessToken: accessToken
            })
            await token.save()

            return {status: 200, data:{
                _id: user._id,
                username: user.username,
                accessToken: accessToken,
                role: user.role
            }}
            
        }catch(e){
            return {status: 500, data:{message: e.message}}
        }
    }

    async getUserProfile(req, res) {

        const user = await User.findOne({_id: req.body._id}).exec()
  
        if(!user){
          return {status: 401, data:{message: "User not found"}}
        }

        const token = await this.auth.checkJwt(req.headers.authorization?.split(' ')[1])
        if(!token){
            return {status: 403, data:{message: "Token Expired"}}
        }

        let userInfo = {
            _id: user._id,
            username: user.username,
            role: user.role,
        }

        return {status: 200, data: userInfo}
    }
}    

module.exports = UserService


