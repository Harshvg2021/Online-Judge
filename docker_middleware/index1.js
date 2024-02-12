
const { exec } = require('child_process');
const fs = require('fs').promises;

async function runCppTest() {
  try {
    const [,, inputCppPath, testcasePath, expectedOutputPath] = process.argv;

    const outputFilePath = 'output.txt';

    await execPromise(`g++ ${inputCppPath} -o cpp_program`);

    await execPromise(`./cpp_program < ${testcasePath} > ${outputFilePath}`);

    const actualOutput = await fs.readFile(outputFilePath, 'utf8');

    const expectedOutput = await fs.readFile(expectedOutputPath, 'utf8');

    const outputsMatch = actualOutput.trim() === expectedOutput.trim();

    console.log(outputsMatch); 
  } catch (error) {
    console.error('Error:', error);
  }
}

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

runCppTest();
