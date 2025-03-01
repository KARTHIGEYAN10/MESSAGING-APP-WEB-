import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogin=()=>{
    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()
    const login=async({username,password})=>{
        setLoading(true)
        try{
            const res=await axios.post("api/auth/login",{username,password})
            console.log(res)
            const data=res.data
            toast.success("Logined successfully")
            localStorage.setItem("chat-user",JSON.stringify(data))
            setAuthUser(data)
            return data
        }catch(error){
            toast.error(error.response?.data?.error)
            console.log(error.response?.data?.error)
            return null
        }finally{
            setLoading(false)
        }
    }
    return {login,loading}
}
export default useLogin