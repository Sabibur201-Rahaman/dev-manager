import React from 'react'
import Contact from './Contact'
function Contacts({contacts,deleteContacts}) {
    console.log(contacts)
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
