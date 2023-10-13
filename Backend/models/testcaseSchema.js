const mongoose = require('mongoose')

const testcaseSchema = new mongoose.Schema({
    problemId : {
        type: String,
        required : true
    },
    testcases: {
        type :JSON,
        requried : true
    }
})
module.exports = mongoose.model('problems',testcaseSchema);
//problem -> id, heading , statement ,input , output , 
//submission,   
