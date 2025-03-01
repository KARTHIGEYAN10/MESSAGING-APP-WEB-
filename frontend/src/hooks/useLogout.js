import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
const useLogout=()=>{
    const[loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()
    const logout=async()=>{
        setLoading(true)
        try{
            const res=await axios.post("api/auth/logout")
            console.log(res.data.message)
            localStorage.removeItem("chat-user")
            setAuthUser(null)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    return {loading,logout}
}
export default useLogout;
