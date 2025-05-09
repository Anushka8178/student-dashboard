// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getStudents, filterStudentsByCourse } from '../firebase/firestore';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const studentsData = await getStudents();
        console.log('Fetched students:', studentsData);
        setStudents(studentsData);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleFilter = async () => {
    try {
      setLoading(true);
      const filteredStudents = await filterStudentsByCourse(courseFilter);
      console.log('Filtered students:', filteredStudents);
      setStudents(filteredStudents);
    } catch (err) {
      console.error('Error filtering students:', err);
      setError('Failed to filter students');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p>Error: {error}</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>
      <div className="filter-section">
        <input 
          type="text" 
          value={courseFilter} 
          onChange={(e) => setCourseFilter(e.target.value)} 
          placeholder="Filter by Course" 
          className="filter-input"
        />
        <button onClick={handleFilter} className="filter-button">Filter</button>
      </div>
      <div className="students-list">
        {students.length === 0 ? (
          <p className="no-students">No students found</p>
        ) : (
          <ul className="students-grid">
            {students.map((student, index) => (
              <li key={index} className="student-card">
                <h3>{student.name}</h3>
                <p className="course">{student.course}</p>
                <p className="email">{student.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .dashboard-title {
          color: #1a73e8;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2.5rem;
        }

        .filter-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .filter-input {
          padding: 0.75rem 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          width: 300px;
          transition: border-color 0.3s ease;
        }

        .filter-input:focus {
          outline: none;
          border-color: #1a73e8;
        }

        .filter-button {
          padding: 0.75rem 1.5rem;
          background-color: #1a73e8;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        .filter-button:hover {
          background-color: #1557b0;
        }

        .students-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          padding: 0;
          list-style: none;
        }

        .student-card {
          background-color: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .student-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .student-card h3 {
          color: #1a73e8;
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
        }

        .student-card .course {
          color: #5f6368;
          margin: 0.5rem 0;
          font-weight: 500;
        }

        .student-card .email {
          color: #5f6368;
          margin: 0.5rem 0;
          font-size: 0.9rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          color: #1a73e8;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #1a73e8;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        .error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          color: #d93025;
          font-size: 1.2rem;
        }

        .no-students {
          text-align: center;
          color: #5f6368;
          font-size: 1.2rem;
          margin-top: 2rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
