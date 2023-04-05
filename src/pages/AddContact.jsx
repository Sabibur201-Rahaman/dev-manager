import React,{useContext} from 'react'
import AddContacts from '../contacts/AddContacts'
import { ContactContext } from "../context/Contact.Context";
function AddContact() {
  const{addContacts}=useContext(ContactContext)
  return (
    <div>
    <AddContacts addContacts={addContacts}/>
    
    
    </div>
  )
}

export default AddContact
