import { createContext, useEffect, useState} from "react";
import { axiosPrivateInstance, axiosPublicInstance } from "../config/axios";
import {toast}from 'react-toastify'
import{useNavigate,useLocation} from 'react-router-dom'
import qs from 'qs'
import axios from "axios";
import { formateContact } from "../utils/formatContact";

export const AuthContext=createContext()
const loadedUser = JSON.parse(localStorage.getItem('user'))
const loadedToken = JSON.parse(localStorage.getItem('token'))


export const AuthProvider=({children})=>{
    const [user, setUser] = useState(loadedUser ? loadedUser : null)
    const [triggerDelete,setTriggerDelete]=useState(false)
    const [token, setToken] = useState(loadedToken ? loadedToken : null)
    const [profileId,setProfileId]=useState(null)
    const [userContacts,setUserContacts]=useState(null)
    const [loaded,setLoaded]=useState(false)
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
           toast.success('registration is successfully done')
           navigate('/contacts')
        }catch(err){
            toast.error(err.response?.data?.error?.message)
        }
    }
    useEffect(()=>{
        if(user&&loaded){
            (async()=>{
                loadUserProfile()
            })()
            
        }
    },[user,loaded])
    const loadUserProfile=async()=>{
        const query=qs.stringify(
            {
                populate: ['profilePicture','user', 'user.contacts'],
             }, 
            
        {
            encodeValuesOnly:true,
        })
        try{
            const response=await axiosPrivateInstance.get(`/profiles/${profileId}?${query}`)
            const mappedContacts=response.data.data.attributes.user.data.attributes.contacts.data.map(contact=>formateContact(contact))
            // console.log(response.data)
            // console.log(mappedContacts)
            setUserContacts(mappedContacts)
            
            setLoaded(true)
        }catch(err){
            console.log(err)
            setLoaded(true)
        }
    }

    useEffect(()=>{
        if(user){
            (async()=>{
                loadUserContacts()
            })()
            
        }
    },[user,triggerDelete])
    const loadUserContacts=async()=>{
        const query=qs.stringify({
            populate:'*',
        },{
            encodeValuesOnly:true,
        })
        try{
            const response=await axiosPrivateInstance.get(`/users/me?${query}`)
            // console.log(response.data)
            setProfileId(response.data.profile.id)
            setLoaded(true)
        }catch(err){
            console.log(err)
            setLoaded(true)
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
            toast.success('successfully logedIn')
            navigate(location?.state?.from?location?.state?.from:'/contacts')
         }catch(err){
             toast.error("err.response?.data?.error?.message")
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
        setTriggerDelete,
        userContacts,
        loaded,
        registerUser,
        login,
        logOut,
        user,
        token,
        profileId
    }
    

    return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

