// src/firebase/firestore.js
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot,
  query,
  where,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { app } from '../firebase.js';

const db = getFirestore(app);

const mockStudents = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    course: "Computer Science",
    createdAt: serverTimestamp()
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    course: "Data Science",
    createdAt: serverTimestamp()
  },
  {
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    course: "Software Engineering",
    createdAt: serverTimestamp()
  },
  {
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    course: "Information Technology",
    createdAt: serverTimestamp()
  },
  {
    name: "David Brown",
    email: "david.brown@example.com",
    course: "Cybersecurity",
    createdAt: serverTimestamp()
  }
];

const initializeMockData = async () => {
  try {
    console.log("Checking if collection is empty...");
    const studentsCollection = collection(db, "students");
    const querySnapshot = await getDocs(studentsCollection);
    
    // Only add mock data if the collection is empty
    if (querySnapshot.empty) {
      console.log("Collection is empty, adding mock data...");
      for (const student of mockStudents) {
        const docRef = await addDoc(studentsCollection, student);
        console.log("Added mock student with ID:", docRef.id);
      }
      console.log("Mock data initialization completed");
    } else {
      console.log("Collection already has data, skipping mock data initialization");
    }
  } catch (error) {
    console.error("Error in initializeMockData:", error);
  }
};

// Call initializeMockData immediately
console.log("Calling initializeMockData...");
initializeMockData().then(() => {
  console.log("initializeMockData promise resolved");
}).catch(error => {
  console.error("initializeMockData promise rejected:", error);
});

export const addStudent = async (student) => {
  try {
    const docRef = await addDoc(collection(db, "students"), {
      ...student,
      createdAt: serverTimestamp()
    });
    console.log("Student added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding student: ", e);
    throw e;
  }
};

export const getStudents = (onUpdate, onError) => {
  try {
    console.log("Setting up students listener...");
    const studentsCollection = collection(db, "students");
    const q = query(studentsCollection);
    
    return onSnapshot(q, (querySnapshot) => {
      console.log("Received snapshot with", querySnapshot.size, "documents");
      const students = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Processed students:", students);
      onUpdate(students);
    }, (error) => {
      console.error("Error in students listener:", error);
      onError(error);
    });
  } catch (e) {
    console.error("Error setting up students listener:", e);
    onError(e);
  }
};

export const filterStudentsByCourse = async (course) => {
  try {
    const studentsCollection = collection(db, "students");
    const q = query(studentsCollection, where("course", "==", course));
    const querySnapshot = await getDocs(q);
    const students = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("Filtered students:", students);
    return students;
  } catch (e) {
    console.error("Error filtering students:", e);
    throw e;
  }
};
