import React from 'react'
import { Container } from 'react-bootstrap'
import{Card,ListGroup,Button} from 'react-bootstrap'
import{FaEye,FaRegTrashAlt}from 'react-icons/fa'
function Contact({contact,deleteContacts}) {
    const{first_name,last_name,profession,dob,email,picture,gender,bio}=contact
  return (
    <>
            <Card className='mb-5'>
              <div className='d-flex'>
              <Card.Img  className='card-pic' src={picture} />
              <Card.Body>
                <Card.Title><span className='text-dark'>{first_name}   {last_name}</span></Card.Title>
                <Card.Title>{profession}</Card.Title>
                <Card.Text>
                  {bio}
                </Card.Text>
              
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Date of Birth:{dob}</ListGroup.Item>
                <ListGroup.Item><span className='text-dark'>Gender:{gender}</span></ListGroup.Item>
                <ListGroup.Item>Profession:{profession}</ListGroup.Item>
                <ListGroup.Item>Email:{email}</ListGroup.Item>
              </ListGroup>
              <div className='card-btn mt-3'>
                <Card.Link ><Button variant='warning ms-3'size='md' type='view'><FaEye/></Button></Card.Link>
                <Card.Link ><Button variant='danger ms-3'size='md' onClick={()=>deleteContacts(contact.id)}><FaRegTrashAlt/></Button></Card.Link>
              
              </div>
              </Card.Body>
              </div>
            </Card>
            </>
  )
}

export default Contact
