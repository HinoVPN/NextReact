const jwt = require('jsonwebtoken');
const Token = require('../models/tokenModel')
const User = require('../models/userModel')
const EXPIRES_IN = 10 * 1000; // 10 sec
const SECRET = 'test';


function signJwt(object,options){
    const token = jwt.sign(JSON.parse(JSON.stringify(object)), SECRET, { ...options && options });
    return token;
}
function verifyJwt(token){
    try {
        const decoded = jwt.verify(token, SECRET)
        return decoded
    } catch(err) {
        return false
    }
}

async function checkJwt(token){
    //check expire
    try {
        const decoded = jwt.verify(token, SECRET);
        return decoded

    } catch(err) {
        return false
    }
}

async function reSignJwt(userId,token){
    const accessToken = await Token.findOne({userId: userId, accessToken: token}).exec()
    if(accessToken){
        let userInfo = {
            _id: userId,
        }
        const newToken = signJwt(userInfo, {expiresIn: '10m'})
        accessToken.accessToken = newToken
        accessToken.save() 
        return {accessToken: newToken}
    }
    return {message: "Invalid User"}
}

async function checkUserAndToken(userId,token){
    const user = await User.findOne({_id: userId}).exec()
    if(!user){
        return {status: 401, data:{message: "User not found"}}
    }
    const currentToken = await checkJwt(token)
    if(!currentToken){
        return {status: 403, data:{message: "Token Expired"}}
    }
    return null
}



module.exports = {
    signJwt,
    verifyJwt,
    checkJwt,
    reSignJwt,
    checkUserAndToken
}