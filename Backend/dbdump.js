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
  heading: 'MALE OR FEMALE??',
  statement: "Gradient want's to organise an event so they have collected some money, all the amount they have collected are in either 50Rs note or 100Rs note, you are given a binary array(containing only 0's and 1's) of length n.if the array[i]=0, it indicates 50Rs note and if array[i]=1 it indicates 100Rs note (0<=i<=n-1). Your Task is to find the total amount collected by gradient club.",
  input: 'The first line contains t, the number of testcases.Each testcase contains a single binary string s which represents money collected by gradient club.',
  output: 'For each testcase, output the total money collected by the gradient club.',
  sampleInput: ["2","01010","000"],
  sampleOutput: ["350","150"],
  });
  
newProblem.save().then(()=>{
  console.log("Inserted Succedfully")
}).catch((err)=>{
  console.log(err);
  console.log("Error inserting ")
});