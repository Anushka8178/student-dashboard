// Mock data
const mockStudents = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    course: 'Computer Science',
    enrollmentDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    course: 'Data Science',
    enrollmentDate: '2024-02-01'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    course: 'Computer Science',
    enrollmentDate: '2024-03-10'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Get all students
  getStudents: async () => {
    await delay(1000); // Simulate network delay
    return [...mockStudents];
  },

  // Get student by ID
  getStudentById: async (id) => {
    await delay(500);
    const student = mockStudents.find(s => s.id === id);
    if (!student) throw new Error('Student not found');
    return { ...student };
  },

  // Get unique courses
  getCourses: async () => {
    await delay(300);
    const courses = [...new Set(mockStudents.map(s => s.course))];
    return courses;
  }
}; 