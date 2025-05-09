// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbmSuYW__xbLVcmmpKXW1dbYYH4AQL_5M",
  authDomain: "student-dashboard-c2645.firebaseapp.com",
  projectId: "student-dashboard-c2645",
  storageBucket: "student-dashboard-c2645.firebasestorage.app",
  messagingSenderId: "65386253954",
  appId: "1:65386253954:web:83dd6cb6b7bae0a094ae9b",
  measurementId: "G-32GXR2723X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the app instance for use in other parts of the app
export { app }; 
