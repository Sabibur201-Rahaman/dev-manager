import { createContext, useState, useReducer, useEffect, useContext } from "react";
import Contact from "../contacts/Contact";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  LOAD_CONTACTS,
  UPDATE_CONTACT,
} from "./types";
import contactsReducer from "./reducer";
import { v4 as uuidv4 } from "uuid";
import { axiosPrivateInstance } from "../config/axios";
import { formateContact } from "../utils/formatContact";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth.Context";
import qs from 'qs'

//create a context
export const ContactContext = createContext();

const initialState = [
  {
    id: "1",
    first_name: "Petr",
    last_name: "Hansmann",
    profession: "webdeveloper",
    bio: " it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.",
    email: "phansmann0@comcast.net",
    gender: "male",
    dob: new Date(),
    picture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    first_name: "Shayne",
    last_name: "Ceyssen",
    profession: "webdisigner",
    bio: " it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.",
    email: "sceyssen1@marriott.com",
    gender: "male",
    dob: new Date(),
    picture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    first_name: "Nichole",
    last_name: "Bance",
    profession: "Architect",
    bio: " it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.",
    email: "nbance2@moonfruit.com",
    gender: "female",
    dob: new Date(),
    picture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "4",
    first_name: "Townsend",
    last_name: "Maase",
    profession: "SoftwareEngineer",
    bio: " it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.",
    email: "tmaase3@globo.com",
    gender: "male",
    dob: new Date(),
    picture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "5",
    first_name: "Ethelred",
    last_name: "Gulliford",
    profession: "SoftwareDeveloper",
    bio: " it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.",
    email: "egulliford4@yahoo.com",
    gender: "male",
    dob: new Date(),
    picture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "6",
    first_name: "Berny",
    last_name: "Frackiewicz",
    profession: "Bloger",
    bio: " it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.",
    email: "bfrackiewicz5@pbs.org",
    gender: "female",
    dob: new Date(),
    picture: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: "7",
    first_name: "Amelina",
    last_name: "Stubbs",
    profession: "Developer",
    bio: " it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.",
    email: "astubbs6@shop-pro.jp",
    gender: "female",
    dob: new Date(),
    picture: "https://randomuser.me/api/portraits/women/7.jpg",
  },
];
//create a provider
export const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactsReducer, initialState);
  const [loaded, setLoaded] = useState(false);
  const [pageNumber,setpageNumber]=useState(null)
  const [pageCount,setPageCount]=useState(1)
  const [trigger,setTrigger]=useState(false)
  const [searchInput,setSearchInput]=useState('hello')
  const{token}=useContext(AuthContext)
  const{user}=useContext(AuthContext)
// console.log(searchInput)
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if(user){
        await loadContacts();
      }
      
    })();
  }, [user,pageNumber]);
  const loadContacts = async () => {
    const query=qs.stringify({
      sort:['id:desc'],
      populate:'*',
      pagination:{
        page:pageNumber,
        pageSize:2,
      }
    })
    try {
      const response = await axiosPrivateInstance.get(`/contacts?${query}`);
      const loadedContacts = response.data.data.map((contact) =>
        formateContact(contact)
      );
      // console.log(response.data)
      dispatch({ type: LOAD_CONTACTS, payload: loadedContacts });
      setPageCount(response.data.meta.pagination.pageCount)
      setLoaded(true);
    } catch (err) {
      setLoaded(true);
    }
  };
  const deleteContacts = async(id) => {
    try{
      const response=await axiosPrivateInstance.delete(`/contacts/${id}`)
      console.log(response.data.data.id)
      dispatch({ type: DELETE_CONTACT, payload: id });
      setTrigger(!trigger)
      toast.success('contact delete successfully')
      // navigate('/contacts')
    }catch(err){
      console.log(err.response)
    }
    
  };
  const updateContact =async(contactToUpdate, id) => {
    
    try{
      const response = await axiosPrivateInstance.put(`/contacts/${id}?populate=*`, {
        data: contactToUpdate,
      });
      const contact = formateContact(response.data.data);
      console.log(contact)
      dispatch({ type: UPDATE_CONTACT, payload: { id:contact.id,contact } }); 
    }catch{
      toast.error(err.response?.data?.error?.message)
    }
  };
  const addContacts = async (contactData) => {
    contactData={
      author:user.id,
      ...contactData
    }
    console.log(contactData)
    try {
      const response = await axiosPrivateInstance.post("/contacts", {
        data: contactData,
      });
      const contact = formateContact(response.data.data);
      dispatch({ type: ADD_CONTACT, payload: contact });
      setTrigger(!trigger)
      return true
    } catch (err) {
      // console.log(err.response?.data?.error?.message)
      console.log(err.response?.data?.error?.details?.errors)
      return false
    }
  };
  const value = {
    loaded,
    contacts,
    addContacts,
    updateContact,
    deleteContacts,
    pageNumber,
    pageCount,
    setpageNumber,
    searchInput,
    setSearchInput,
  };
  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};
