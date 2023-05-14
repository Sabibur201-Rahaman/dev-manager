import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'
import qs from 'qs'
import { axiosPrivateInstance } from '../config/axios'
import { formateContact } from '../utils/formatContact'
import Loader from '../utils/Loader'

function Search({searchInput}) {
  console.log(searchInput)
    const{token}=useContext(AuthContext)
  const{user}=useContext(AuthContext)
  const[searchResults,setSearchResults]=useState(null)
  const[loaded,setLoaded]=useState(false)
  useEffect(()=>{
    if(searchInput){
      (async()=>{
        await getResult()
      })()
    }else {
      setLoaded(true)
    }
   },[searchInput])
  async function getResult(){
    const query = qs.stringify({
      filters: {
        $or: [
          {
            first_name: {
              $contains: searchInput,
            },
          },
          {
            last_name: {
              $contains: searchInput,
            },
          },
          {
            bio: {
              $contains: searchInput,
            },
          },
        ],
      },
    })
    try{
      const response= await axiosPrivateInstance.get(`/contacts?${query}`)
      const data=response.data.data.map((contact)=>formateContact(contact))
      setLoaded(true)
      console.log(data)
      setSearchResults(data)
    }catch(err){
      setLoaded(true)
  console.log(err)
    }
  }
  
  
  return (
    <>
      <h2 className="mt-5 text-center">Searching for {searchInput}...</h2>
      {loaded?(searchResults.length >0?(searchResults.map((contact,idx)=> (<h2 key={idx}>{contact.first_name} {contact.last_name}</h2>))):(<p>NotFound</p>)):(
        <Loader/>
      )
    }
    </>
  )
}

export default Search