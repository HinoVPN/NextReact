const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    username:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    createdDate:{ type: Date, default: Date.now},
    lastUpdatedDate:{ type: Date, default: Date.now},
    status:{ type: String, default: 1, enum:[0,1,8]},
    role:{ type: String, default: 'user', enum:['user','admin']}
})

userSchema.pre('find',function(next){
    this.where('status').ne(0)
    next()
})

userSchema.pre('findOne',function(next){
    this.where('status').ne(0)
    next()
})

module.exports = mongoose.model("User", userSchema)