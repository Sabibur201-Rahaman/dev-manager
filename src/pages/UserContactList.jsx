import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'
import { Table,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ContactContext } from '../context/Contact.Context'


function UserContactList() {
  const {userContacts,loaded,setTriggerDelete}=useContext(AuthContext)
  const { deleteContacts } = useContext(ContactContext)
  // console.log(object)
  const handleDelete =(id)=>{
deleteContacts(id)
setTriggerDelete(true)
  }
  return loaded &&(
    <Table striped size='md'>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>email</th>
        <th>profession</th>
        <th>DOB</th>
      </tr>

    </thead>
  <tbody>
    { userContacts && userContacts.map((userContact)=>{
      return(
        <tr key={userContact.id}>
          <td>{userContact.id}</td>
          
          <td>{userContact.first_name}</td>
          <td>{userContact.last_name}</td>
          <td>{userContact.email}</td>
          <td>{userContact.profession}</td>
          <td>{userContact.dob}</td>
          <td>
                  <Button
                    variant='danger'
                    onClick={() => handleDelete(userContact.id)}
                  >
                    Delete
                  </Button>
                </td>

                <td>
                  <Button
                    variant='secondary'
                    as={Link}
                    to={`/edit-contact/${userContact.id}`}
                  >
                    Edit
                  </Button>
                </td>
        </tr>
      )
    })}
  </tbody>
    </Table>
   
  )
}

export default UserContactList
