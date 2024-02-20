// Problems.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseurl from '../middleware/baseurl';
import '../styles/Problems.css'; // Import the CSS file
import { extractUserIdFromToken } from '../components/ExtractUserIdFromToken';


function Problems() {
  const { problemID } = useParams();
  const [problemData, setProblemData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFile,setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblemData();
  }, [problemID]);

  const handleFileChange = (event)=>{
    setSelectedFile(event.target.files[0])
  }
  const handleSumbit = async()=>{
    if(!selectedFile){
      alert("Select file before upload");
      return ;
    }
    const token = localStorage.getItem('authToken');
    const data = new FormData();
    const userId = extractUserIdFromToken(token);
    console.log("userid : ",userId)

    data.append('codeFile',selectedFile)
    data.append('userId',userId ); 
    data.append('problemId', problemID); 
    data.append('problemName',problemData.heading)
    try{
      const response = await fetch(baseurl + '/uploadCode', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('File upload failed.');
      }

      console.log('File uploaded successfully!');
      alert('File uploaded succesfully')
      navigate('/submissions')

    }catch(error){
      console.log("error in uploading file : ",error);
    }
  }
  const fetchProblemData = async () => {
    try {
      const response = await fetch("http://localhost:4443/getProblems", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemId: problemID,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setProblemData(data);
      console.log(problemData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching problem data:', err);
      setLoading(false);
    }
  };
  
  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <h1 className="heading">{problemData.heading}</h1>
          </div>
          <div className="statement-container">
            <p className="statement">{problemData.statement}</p>
          </div>
          <div className="section">
            <h2>Input Format:</h2>
            <pre>{problemData.input}</pre>
          </div>
          <div className="section">
            <h2>Output Format:</h2>
            <pre>{problemData.output}</pre>
          </div>
          <div className="section">
            <h2>Sample Input:</h2>
            <div className="sample-container">
              {problemData.sampleInput.map((line, index) => (
                <pre key={index}>{line}</pre>
              ))}
            </div>
          </div>
          <div className="section">
            <h2>Sample Output:</h2>
            <div className="sample-container">
              {problemData.sampleOutput.map((line, index) => (
                <pre key={index}>{line}</pre>
              ))}
            </div>
          </div>
          <input type="file" onChange={handleFileChange}/>
          <button onClick={handleSumbit}>Submit Code</button>
        </>
      )}
    </div>
  );
}

export default Problems;
