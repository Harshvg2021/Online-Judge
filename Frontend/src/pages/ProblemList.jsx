import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseurl from '../middleware/baseurl';
import { Link } from 'react-router-dom';
import '../styles/ProblemList.css'; // Import your CSS file

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const response = await axios.post(baseurl + '/getProblems');
      setProblems([...response.data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="problem-list-container">
      {loading ? (
        <p>Loading...</p>
      ) : problems && problems.length > 0 ? (
        <>
          <div>
            <h1>List of all problems:</h1>
          </div>
          {problems.map((x, index) => (
            <div key={index} className="problem-card">
              <div className="index-container">
                <p>{index + 1}</p>
              </div>
              <div className="content-container">
                <p>
                  <Link to={`/problems/${x._id}`}>{x.heading}</Link>
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>We are trying to add more problems!</p>
      )}
    </div>
  );
}

export default ProblemList;
