import React from 'react'
import Contact from './Contact'
import { ContactContext } from '../context/Contact.Context'

function Contacts() {
  const {contacts,deleteContacts}=React.useContext(ContactContext)

  return (
    <div>
        <h2 className='mt-5 text-center'>All Contacts</h2>
      {contacts.map((contact)=>(
      <Contact key={contact.id}contact={contact} deleteContacts={deleteContacts}/>
      ))}
    </div>
  )
}

export default Contacts
