import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/SubmissionsPage.css';

const SubmissionsPage = ({ userId }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchUserSubmissions = async () => {
      try {
        const response = await axios.get(`/getsubmissions?userId=${userId}`);
        setSubmissions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserSubmissions();
  }, [userId]);

  return (
    <div>
      <h1>Your Submissions</h1>
      <table className="submission-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Problem Name</th>
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={submission._id} className={`verdict-${submission.verdict.toLowerCase().replace(' ', '-')}`}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/problems/${submission.problemId}`}>{submission.problemName}</Link>
              </td>
              <td>{submission.verdict}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsPage;
