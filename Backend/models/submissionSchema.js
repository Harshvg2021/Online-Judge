const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    problemName: {
        type: String,
        required: true
    },
    verdict: {
        type: String,
        enum: ['Accepted', 'Wrong Answer', 'In Queue', 'Compilation Error', 'Runtime Error'],
        default: 'In Queue'
    },
    codeFile: {
        filename: String,
        originalname: String,
        mimetype: String,
        size: Number
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('submissions', submissionSchema);
