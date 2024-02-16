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
  heading: 'Two Sum Problem',
  statement: 'Given an array of integers, find two numbers such that they add up to a specific target number.',
  input: 'The first line denotes the number of test cases. The next line consists of two space-separated integers: the length of the array (n) and the target sum (k). The following line contains n space-separated integers representing the array A.',
  output: 'For each test case, output two space-separated integers representing the indices of the two numbers whose sum is equal to the target sum. If no such pair is found, output -1.',
  sampleInput: ["2","4 5","2 2 1 3","2 5","1 1"],
  sampleOutput: ["1 4","-1"],
  });
  
newProblem.save().then(()=>{
  console.log("Inserted Succedfully")
}).catch((err)=>{
  console.log(err);
  console.log("Error inserting ")
});