const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    problemId : {
        type: String,
        required: true
    },
    verdict : {
        type: String,
        required: true
    },
},
{timestamps : true}
)
module.exports = mongoose.model('submissions',submissionSchema); 
