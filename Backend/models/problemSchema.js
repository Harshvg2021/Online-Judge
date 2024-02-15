const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    heading  : {
        type : String,
        required : true,
    },
    statement : {
        type : String,
        required : true,
    },
    input  :{
        type : String,
        required : true
    },
    output : {
        type : String,
        required :true
    },
    sampleInput : {
        type : [Number]
    },
    sampleOutput : {
        type : [Number]
    }
})
module.exports = mongoose.model('problems',problemSchema);
//problem -> id, heading , statement ,input , output , 
//submission,   
