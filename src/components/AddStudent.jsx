// src/components/AddStudent.js
import React, { useState } from 'react';
import { addStudent } from '../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './AddStudent.css';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const newStudent = { name, course, email };

    try {
      await addStudent(newStudent);
      navigate('/');
    } catch (err) {
      setError('Error adding student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-container">
      <div className="add-student-card">
        <h1 className="add-student-title">Add New Student</h1>
        <p className="add-student-subtitle">Enter student details below</p>

        <form onSubmit={handleAddStudent} className="add-student-form">
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input 
              id="name"
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter student name" 
              required 
              className="add-student-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter student email" 
              required 
              className="add-student-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course</label>
            <select
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              className="add-student-input"
            >
              <option value="">Select a course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Data Science">Data Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="button-group">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="cancel-button"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Adding Student...' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
