const express = require("express");
const env = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path');
const { execSync,exec } = require('child_process');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'code-uploads/')
    },
    filename: function (req, file, cb) {
        const name = uuidv4();
        cb(null, name + path.extname(file.originalname));
    },
})

const app = express();
app.use(bodyParser.json());
app.use(cors());
const upload = multer({ storage: storage })
app.use('/code-uploads', express.static(path.join(__dirname, 'code-uploads')));

env.config();

const User = require("./models/userSchema")
const problems = require("./models/problemSchema")
const Submission = require("./models/submissionSchema")


console.log(process.env.CONN_STRING)
mongoose.connect(process.env.CONN_STRING, { dbName: "OJ" })
    .then(() => {
        console.log("MongoDB Connected");
    });



app.post('/uploadCode', upload.single("codeFile"), async (req, res) => {
    try {
        console.log(req.file);
        const newSubmission = new Submission({
            userId: req.body.userId,
            problemId: req.body.problemId,
            problemName: req.body.problemName,
            codeFile: {
                filename: req.file.filename,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        });
        await newSubmission.save();

        const containerId = process.env.CONTAINER_ID;
        const inputCodePath = path.join(__dirname, `code-uploads/${req.file.filename}`)
        // const codeFilePath = `./app/code-uploads/${req.file.filename}`;
        const command = `docker cp ${inputCodePath} ${containerId}:./app/code.cpp`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error copying code file to container:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log('Code file copied to container');

            res.status(200).json({ message: 'File uploaded and copied to container successfully' });
        });
    } catch (error) {
        console.log("upload code error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
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
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/getProblems', async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            const problemData = await problems.find({});
            res.json(problemData);
        } else {
            const specificProblemId = req.body.problemId;
            const specificProblem = await problems.findById(specificProblemId);
            console.log(specificProblem)
            res.json(specificProblem);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Internal Server Error' })
    }
})

app.post('/getSubmissions', async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log(userId)
        if (!userId) {
            return res.status(400).json({ message: "User id is required" })
        }
        const submissions = await Submission.find({ userId })
        res.status(200).json({ submissions })

    } catch (error) {
        console.log("error in submission : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
})
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




app.post('/copyFiles', (req, res) => {
    try {
        const { problemId, codeFilePath } = req.body;

        const expectedOutputFilePath = path.join(__dirname, `expectedOutputs/${problemId}.txt`);
        const testcaseFilePath = path.join(__dirname, `testcases/${problemId}.txt`);
        const containerId = process.env.CONTAINER_ID;

        execSync(`docker cp ${expectedOutputFilePath} ${containerId}:./app/expectedOutput.txt`);
        execSync(`docker cp ${testcaseFilePath} ${containerId}:./app/testcase.txt`);

        return res.status(200).json({ message: 'Files copied successfully' });
    } catch (error) {
        console.error('Error copying files:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/executeCode', (req, res) => {
  try {
    const containerId = process.env.CONTAINER_ID;

    const command = `docker exec  ${containerId} node index1.js ./code.cpp ./testcase.txt ./expectedOutput.txt`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing command:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const output = stdout.toString().trimEnd();
      console.log('Command Output:', output);

      return res.status(200).json({ message: 'Code executed successfully', output });
    });
  } catch (error) {
    console.error('Error executing code:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(process.env.PORT, () => {
    console.log(`server is ready for port ${process.env.PORT}`)
})   