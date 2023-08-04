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
        const newToken = signJwt(userInfo, {expiresIn: '10s'})
        accessToken.accessToken = newToken
        accessToken.save() 
        return {accessToken: newToken}
    }
    return {message: "Invalid User"}
}



module.exports = {
    signJwt,
    verifyJwt,
    checkJwt,
    reSignJwt
}