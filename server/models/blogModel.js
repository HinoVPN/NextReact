const { Schema, default: mongoose } = require("mongoose");
const User = require("./userModel");

const blogSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'User', required: true},
    blogTitle:{ type: String, required: true},
    blogContent:{ type: String, required: true},
    blogImage:{ type: String},
    blogTags:[{ type: String, default: "Others"}],
    blogCategory:{ type: String, default: "Others"},
    createdDate:{ type: Date, default: Date.now},
    lastUpdatedDate:{ type: Date, default: Date.now},
    status:{ type: String, default: 1, enum:[0,1,8]},
})

blogSchema.pre('find',function(next){
    this.where('status').ne(0)
    this.populate({ path: 'user', select: "username role" });
    next()
})

blogSchema.pre('findOne',function(next){
    this.where('status').ne(0)
    this.populate({ path: 'user', select: "username role" });
    next()
})

module.exports = mongoose.model("Blog", blogSchema)