const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    problemId : {
        type: mongoose.Schema.Types.ObjectId,
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
