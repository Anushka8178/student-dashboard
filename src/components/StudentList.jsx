import React, { useState, useEffect } from 'react';
import { getStudents } from '../firebase/firestore';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = getStudents((updatedStudents) => {
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
      setLoading(false);
    }, (err) => {
      setError('Failed to fetch students data');
      console.error('Error fetching data:', err);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const filtered = students.filter(student => student.course === selectedCourse);
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [selectedCourse, students]);

  // Get unique courses from students
  const courses = [...new Set(students.map(student => student.course))];

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (loading) {
    return (
      <div className="student-list-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="student-list-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="student-list-container">
      <div className="student-list-header">
        <h2>Student List</h2>
        <div className="filter-section">
          <label htmlFor="course-filter">Filter by Course:</label>
          <select
            id="course-filter"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="course-filter"
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="student-list">
        {filteredStudents.length === 0 ? (
          <p className="no-students">No students found</p>
        ) : (
          filteredStudents.map(student => (
            <div key={student.id} className="student-card">
              <div className="student-info">
                <h3>{student.name}</h3>
                <p className="student-email">{student.email}</p>
                <p className="student-course">{student.course}</p>
                <p className="student-date">Added: {formatDate(student.createdAt)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentList; 