import { useEffect,useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { ClipLoader } from "react-spinners";

const PrivateRoute=({ children }) =>{
    const auth=getAuth(app);
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();

    },[auth]);

    if (loading) return <ClipLoader size={50} color="#0000FF" />;
    return user ? children : <Navigate to="/login" />;

};
export default PrivateRoute