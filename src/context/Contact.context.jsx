import {createContext,useState,useReducer,useEffect}from 'react'
import Contact from '../contacts/Contact'
import { ADD_CONTACT,DELETE_CONTACT,UPDATE_CONTACT } from './types'
import contactsReducer from './reducer'
import { v4 as uuidv4 } from 'uuid'
import { axiosPrivateInstance } from '../config/axios'

//create a context
export const ContactContext=createContext()
const initialState=[
    {
      id: '1',
      first_name: "Petr",
      last_name: "Hansmann",
      profession:'webdeveloper',
      bio:' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      email: "phansmann0@comcast.net",
      gender: "male",
      dob: new Date(),
      picture: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: '2',
      first_name: "Shayne",
      last_name: "Ceyssen",
      profession:'webdisigner',
      bio:' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      email: "sceyssen1@marriott.com",
      gender: "male",
      dob: new Date(),
      picture: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: '3',
      first_name: "Nichole",
      last_name: "Bance",
      profession:'Architect',
      bio:' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      email: "nbance2@moonfruit.com",
      gender: "female",
      dob: new Date(),
      picture: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: '4',
      first_name: "Townsend",
      last_name: "Maase",
      profession:'SoftwareEngineer',
      bio:' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      email: "tmaase3@globo.com",
      gender: "male",
     dob: new Date(),
      picture: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: '5',
      first_name: "Ethelred",
      last_name: "Gulliford",
      profession:'SoftwareDeveloper',
      bio:' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      email: "egulliford4@yahoo.com",
      gender: "male",
      dob: new Date(),
      picture: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      id: '6',
      first_name: "Berny",
      last_name: "Frackiewicz",
      profession:'Bloger',
      bio:' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      email: "bfrackiewicz5@pbs.org",
      gender: "female",
      dob: new Date(),
      picture: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      id: '7',
      first_name: "Amelina",
      last_name: "Stubbs",
      profession:'Developer',
      bio:' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      email: "astubbs6@shop-pro.jp",
      gender: "female",
      dob: new Date(),
      picture: "https://randomuser.me/api/portraits/women/7.jpg"
    },
  ]
//create a provide
export const ContactProvider=({children})=>{
    const [contacts, dispatch] = useReducer(contactsReducer,initialState)
    useEffect(()=>{
     ; (async()=>{
        await loadContacts()
      })()
    },[])
    const loadContacts=async()=>{
      try{
        const response=await axiosPrivateInstance.get('/contacts')
        console.log(response.data)
      }catch(err){
        console.log(err.response)
      }
    }
    const deleteContacts=(id)=>{
        dispatch({type:DELETE_CONTACT,payload:id})
      }
      const updateContact=(contactToUpdate,id)=>{
        dispatch({type:UPDATE_CONTACT,payload:{contactToUpdate,id}})
        
         }
         const addContacts=contact=>{  
          dispatch({type:ADD_CONTACT,payload:contact})
        }
    const value={
        contacts,
        addContacts,
        updateContact,
        deleteContacts
    }
    return( <ContactContext.Provider value={value}>{children}</ContactContext.Provider>)
       
    

}