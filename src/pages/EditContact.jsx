import React from 'react'
import AddContacts from '../contacts/AddContacts'
import {useParams} from 'react-router-dom'

function EditContact({contacts,updateContact}) {
    const {id}=useParams()
    const foundContact=contacts.find((contact1)=>contact1.id===id)

  return (
    <div>
      <AddContacts contact1={foundContact} updateContact={updateContact}/>
    </div>
  )
}

export default EditContact
