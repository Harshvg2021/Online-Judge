// import React, { useState } from 'react'
// const Docker = require('dockerode');
// const docker = new Docker();

// function Test() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [code,setCode] = useState();
//     const handleFileChange = (event) => {
//       const file = event.target.files[0];
//       setSelectedFile(file);
  
//       // Read the contents of the file
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileContent = e.target.result;
//         code = fileContent;
//         console.log('File content:', fileContent);
//       };
//       reader.readAsText(file); // This reads the file as text, you can use 'readAsDataURL' for other formats
//     };
//     const handleSubmit = (event) => {
//       event.preventDefault();
  
//       if (selectedFile) {
//         // Here you can handle the uploaded file
//         console.log('Selected file:', selectedFile);
//       } else {
//         alert('Please select a file first.');
//       }
//     };
//     const runDocker = async () =>{
//       try {
//         const container = await docker.createContainer({
//           Image: 'frolvlad/alpine-gxx',
//           Tty: false,
//           AttachStdout: true,
//           AttachStderr: true,
//           Cmd: ['node', '-e', code],
//         });
    
//         const data = await container.start();
    
//         // Set up log streaming
//         const logStream = await container.logs({
//           follow: true,
//           stdout: true,
//           stderr: true,
//         });
    
//         // Handle logs directly in the server console
//         logStream.on('data', (chunk) => {
//           console.log(chunk.toString());
//         });
    
//         // container.wait((err, data) => {
//         //   // Remove the container
//         //   container.remove();
    
//         //   if (err) {
//         //     console.error('Error waiting for container:', err);
//         //   } else {
//         //     console.log('Container exited with code:', data.StatusCode);
//         //   }
//         // });
    
//         // Respond to the client indicating that code execution started
//       } catch (error) {
//         console.error('Error creating container:', error);
//       }
//     }
//     }
//   return (
//     <div>
//       <h1>File Upload</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   )
// }

// export default Test