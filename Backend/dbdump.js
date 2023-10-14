const env = require('dotenv');
const mongoose = require('mongoose');

env.config();


console.log(process.env.CONN_STRING)
mongoose.connect(process.env.CONN_STRING, { dbName: "OJ" })
    .then(() => {
        console.log("MongoDB Connected");
    });


const problem = require('./models/problemSchema')
const newProblem = new problem({
    heading: 'Valid Parentheses',
    statement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.An input string is valid if:Open brackets must be closed by the same type of brackets.Open brackets must be closed in the correct order.Every close bracket has a corresponding open bracket of the same type.",
    input: 'String containing brackets',
    output: 'return true of false based on the problem statemnet',
    sampleInput: {
      input1: 's = "()"',
      input2: 's = "()[]{}"'
    },
    sampleOutput : {
      output1 : 'true',
      output2 : 'true'
    }
  });
  
newProblem.save().then(()=>{
  console.log("Inserted Succedfully")
}).catch((err)=>{
  console.log("Error inserting ")
});