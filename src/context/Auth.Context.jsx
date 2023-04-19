import { createContext, useState} from "react";
import { axiosPublicInstance } from "../config/axios";
import {toast}from 'react-toastify'
import{useNavigate,useLocation} from 'react-router-dom'

export const AuthContext=createContext()
const loadedUser = JSON.parse(localStorage.getItem('user'))
const loadedToken = JSON.parse(localStorage.getItem('token'))


export const AuthProvider=({children})=>{
    const [user, setUser] = useState(loadedUser ? loadedUser : null)
    const [token, setToken] = useState(loadedToken ? loadedToken : null)
    const location=useLocation()
    const navigate=useNavigate()
    const registerUser=async(data)=>{
        try{
           const response=await axiosPublicInstance.post(
            '/auth/local/register',
            data
           )
           const {user,jwt}=response.data
           
           localStorage.setItem('user',JSON.stringify(user))
           localStorage.setItem('token',JSON.stringify(jwt))
           console.log(response.data)
           toast.success('registration is successfully done')
           navigate('/contacts')
        }catch(err){
            toast.error(err.response?.data?.error?.message)
            // console.log(err.response.data.error.message)
        }
    }

    const login=async(data)=>{
        try{
            const response=await axiosPublicInstance.post( '/auth/local/',data)
            const {user,jwt}=response.data
            
            localStorage.setItem('user',JSON.stringify(user))
            localStorage.setItem('token',JSON.stringify(jwt))
            setUser(user)
            setToken(jwt)
            console.log(response.data)
            toast.success('successfully logedIn')
            navigate(location?.state?.from?location?.state?.from:'/contacts')
         }catch(err){
             toast.error("err.response?.data?.error?.message")
            //  console.log(err.response.data.error.message)
         }
    }
    const logOut=()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
       setToken(null)
        toast.success('logout is successfully redirecting...')
        navigate('/')
    }
    
    const value={
        registerUser,
        login,
        logOut,
        user,
        token
    }
    

    return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

