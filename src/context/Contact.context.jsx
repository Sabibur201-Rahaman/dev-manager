import {createContext,useState}from 'react'
import Contact from '../contacts/Contact'
import { v4 as uuidv4 } from 'uuid'

//create a context
export const ContactContext=createContext()
const initialState=[
    {
      "id": '1',
      "first_name": "Petr",
      "last_name": "Hansmann",
      'profession':'webdeveloper',
      'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      "email": "phansmann0@comcast.net",
      "gender": "male",
      "dob": "29/12/1987",
      "picture": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      "id": '2',
      "first_name": "Shayne",
      "last_name": "Ceyssen",
      'profession':'webdisigner',
      'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      "email": "sceyssen1@marriott.com",
      "gender": "male",
      "dob": "26/12/1992",
      "picture": "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      "id": '3',
      "first_name": "Nichole",
      "last_name": "Bance",
      'profession':'Architect',
      'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      "email": "nbance2@moonfruit.com",
      "gender": "female",
      "dob": "11/09/1986",
      "picture": "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      "id": '4',
      "first_name": "Townsend",
      "last_name": "Maase",
      'profession':'SoftwareEngineer',
      'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      "email": "tmaase3@globo.com",
      "gender": "male",
      "dob": "19/04/1983",
      "picture": "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      "id": '5',
      "first_name": "Ethelred",
      "last_name": "Gulliford",
      'profession':'SoftwareDeveloper',
      'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      "email": "egulliford4@yahoo.com",
      "gender": "male",
      "dob": "14/01/1979",
      "picture": "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      "id": '6',
      "first_name": "Berny",
      "last_name": "Frackiewicz",
      'profession':'Bloger',
      'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      "email": "bfrackiewicz5@pbs.org",
      "gender": "female",
      "dob": "27/11/1996",
      "picture": "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      "id": '7',
      "first_name": "Amelina",
      "last_name": "Stubbs",
      'profession':'Developer',
      'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
      "email": "astubbs6@shop-pro.jp",
      "gender": "female",
      "dob": "19/09/1995",
      "picture": "https://randomuser.me/api/portraits/women/7.jpg"
    },
  ]

//create a provide
export const ContactProvider=({children})=>{
    const [contacts, setContacts] = useState(initialState)
    const deleteContacts=(id)=>{
        const updatedContacts=contacts.filter(contact=> contact.id!==id)
        setContacts(updatedContacts)
      }
      const updateContact=(contactToUpdate,id)=>{
        console.log(updateContact)
        const contactsWithUpdate=contacts.map((contact)=>{
         
          if(contact.id===id){
           
            return{
              id,
              ...contactToUpdate
            }
          }
          else{
            return contact
          }
        })
        setContacts(contactsWithUpdate)
         }
         const addContacts=contact=>{  
        let addToContacts={
           id:uuidv4(),
          ...contact,
         }
        setContacts([addToContacts,...contacts])
        }
    const value={
        contacts,
        addContacts,
        updateContact,
        deleteContacts
    }
    return( <ContactContext.Provider value={value}>{children}</ContactContext.Provider>)
       
    

}