import React from 'react'
import AddContacts from '../contacts/AddContacts'
function AddContact({addContacts}) {
  return (
    <div>
    <AddContacts addContacts={addContacts}/>
    </div>
  )
}

export default AddContact
