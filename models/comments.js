// import  mongoose from 'mongoose'
const mongoose = require('mongoose')
const  { Schema, model } = mongoose

const commentSchema = new Schema({
    text: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    authorName: {type: String},
    rout: {type: mongoose.Schema.Types.ObjectId, ref: 'Rout'}
});

// const Comment = model('Comment', commentSchema);

// export default Comment;
module.exports = mongoose.model('Comment', commentSchema);
