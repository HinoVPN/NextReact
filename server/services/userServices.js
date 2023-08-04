const bcrypt = require("bcrypt")
const saltRounds = 10;

    //create a function encryptPassword that takes a password and returns a hash
function encryptPassword(password) {  
    return bcrypt.hashSync(password, saltRounds)
}

    //check if password is correct
function comparePassword(password, hash) {  
    if (bcrypt.compareSync(password, hash)) {
        return true
    } else {
        return false
    }
}

module.exports = {
    encryptPassword,
    comparePassword
}


