import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser}=useAuthContext()
    const signup = async (inputs) => {
        const success = handleInputErrors(inputs);
        if (!success) {
            return null; 
        }

        setLoading(true);
        try {
            const res = await axios.post("/api/auth/signup", inputs);
            console.log(res)
            const data = res.data;
            console.log("Signup Response:", data);
            toast.success("Signup successful!");
            localStorage.setItem("chat-user",JSON.stringify(data))
            setAuthUser(data)
            return data; 
        } catch (error) {
            toast.error(error.response?.data?.error || "Signup failed!");
            console.log(error)
            return null; 
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading };
};

export default useSignup;

function handleInputErrors({ fullname, username, password, confirmpassword, gender }) {
    if (!fullname || !username || !password || !confirmpassword || !gender) {
        toast.error("Please fill all the fields");
        return false;
    }
    if (password !== confirmpassword) {
        toast.error("Passwords do not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }
    return true;
}
