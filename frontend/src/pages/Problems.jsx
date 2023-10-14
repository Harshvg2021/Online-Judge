import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import baseurl from '../middleware/baseurl';

function Problems() {
  const params = useParams();
  const problemID = params.problemID;
  console.log(problemID);
  const [problemData, setProblemData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblemData()
  }, [])

  const fetchProblemData = async () => {
    try {
      console.log("Inside the Function??");
      const response = await axios.post(baseurl + "/getProblems", {
        problemId : problemID
      });
      setProblemData(response.data)
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <>
      {
        <div >
          <div style={{ marginRight: "5px" }}>
            <p>{problemData.heading}</p>
          </div>
          <div>
            <p>{problemData.statement}</p>
          </div>
          <div>
            <p>INPUT : {problemData.input}</p>
          </div>
          <div>
            <p>OUTPUT : {problemData.input}</p>
          </div>
        </div>
      }

    </>
  )
}

export default Problems