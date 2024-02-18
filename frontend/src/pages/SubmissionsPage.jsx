import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SubmissionsPage.css';
import { extractUserIdFromToken } from '../components/ExtractUserIdFromToken';
import baseurl from '../middleware/baseurl';

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const token = localStorage.getItem('authToken');
  const userId = extractUserIdFromToken(token);
  console.log(userId)
  useEffect(() => {
    const fetchSubmissions = async (userId) => {
    try {
      const response = await fetch(`${baseurl}/getSubmissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      const fetchedSubmissions = data.submissions;
      setSubmissions(fetchedSubmissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

    fetchSubmissions(userId);
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
