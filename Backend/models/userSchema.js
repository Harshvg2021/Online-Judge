const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName  : {
        type : String,
        required : true,
    },
    userEmail : {
        type : String,
        required : true,
    },
    userPassword  :{
        type : String,
        required : true
    },
    problemsSolved : {
        type : Number,
        default : 0
    },
})
module.exports = mongoose.model('users',userSchema)
 //user harsh
 //pass XHFnzuPI8qI18HaA
 // mongodb+srv://harsh:XHFnzuPI8qI18HaA@onlinejudge.dj1ti4f.mongodb.net/