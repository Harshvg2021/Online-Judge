const express = require('express')
const env = require('dotenv').config()

const app = express()


const { exec } = require('child_process');
const fs = require('fs');

function runCppTest(inputCppPath, testcasePath, expectedOutput) {
  return new Promise((resolve, reject) => {
    const outputFilePath = 'output.txt';

    // Compile the C++ code
    exec(`g++ ${inputCppPath} -o cpp_program`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return; 
      }

      // Run the compiled C++ program with the test case
      exec(`./cpp_program < ${testcasePath} > ${outputFilePath}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }

        // Read the actual output
        fs.readFile(outputFilePath, 'utf8', (readFileError, actualOutput) => {
          if (readFileError) {
            reject(readFileError);
            return;
          }

          // Compare the actual output with the expected output
          const outputsMatch = actualOutput.trim() === expectedOutput.trim();
          resolve({ outputsMatch, actualOutput });
        });
      });
    });
  });
}

// Example usage:
const inputCpp = '/home/harsh/Documents/docker-node/external/a.cpp';
const testcase = '/home/harsh/Documents/docker-node/external/input.txt';
const expectedOutput = fs.readFileSync('/home/harsh/Documents/docker-node/external/expectedOutput.txt', 'utf8');

runCppTest(inputCpp, testcase, expectedOutput)
  .then(({ outputsMatch, actualOutput }) => {
    if (outputsMatch) {
      console.log('Test passed!');
    } else {
      console.error('Test failed. Actual output:\n', actualOutput);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


