const express = require("express");
const env = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

env.config();

const User = require("./models/userSchema")
const problems = require("./models/problemSchema")

console.log(process.env.CONN_STRING)
mongoose.connect(process.env.CONN_STRING, { dbName: "OJ" })
    .then(() => {
        console.log("MongoDB Connected");
    });

app.post('/register', async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body;

        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const newUser = new User({
            userName,
            userEmail,
            userPassword: hashedPassword,
            problemsSolved: 0
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/getProblems' ,async (req,res)=>{
    try{
        if (Object.keys(req.body).length === 0) {
            const problemData = await problems.find({});
            res.json(problemData);
        } else {
            const specificProblemId = req.body.problemId; 
            const specificProblem = await problems.findById(specificProblemId); 
            res.json(specificProblem);
        }
    }catch(err){
        console.log(err);
        res.status(400).json({message: 'Internal Server Error'})
    }
})

app.get('/getProblem')

app.post('/login', async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email , Please recheck!!' });
        }

        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`server is ready for port ${process.env.PORT}`)
})   