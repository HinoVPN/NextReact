const { Schema, default: mongoose } = require("mongoose");

const tokenSchema = new Schema({
    userId:{ type: String, required: true, unique: true},
    accessToken: { type: String },
    refreshToken: { type: String }
})


module.exports = mongoose.model("Token", tokenSchema)