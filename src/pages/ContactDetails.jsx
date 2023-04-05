import React,{useContext} from "react";
import { useParams,useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import {toast} from 'react-toastify'
import { ContactContext } from "../context/Contact.Context";

function ContactDetails() {
  const {contacts,deleteContacts}=useContext(ContactContext)
  const [contact, setContact] = useState({});
  const Navigate=useNavigate()
 
  const { id } = useParams();
  
  const foundContact = contacts.find((contact) => {
    return contact.id === id;
  });
  useEffect(() => {
    if (id && foundContact) {
      setContact(foundContact);
    }
  }, [id]);
  const handleDelete = () => {
    toast.success('contact deleted successfully')
    deleteContacts(id)
    Navigate('/contacts')
  };
  const {
    first_name,
    last_name,
    profession,
    dob,
    email,
    gender,
    bio,
    picture,
  } = contact;
  return (
    <>
      <h2 className="mt-5 text-center">Contact Details</h2>
      {Object.keys(contact).length===0?(<p>contact not found</p>):(
        <Card className="mb-5">
        <div className="d-flex">
          <Card.Img className="card-pic" src={picture} />
          <Card.Body>
            <Card.Title>
              <span className="text-dark">{first_name}</span>
            </Card.Title>
            <Card.Title>
              <span className="text-dark">{last_name}</span>
            </Card.Title>
            <Card.Title>{profession}</Card.Title>
            <Card.Text>{bio}</Card.Text>

            <ListGroup className="list-group-flush">
              <ListGroup.Item>Date of Birth:{dob}</ListGroup.Item>
              <ListGroup.Item>
                <span className="text-dark">Gender:{gender}</span>
              </ListGroup.Item>
              <ListGroup.Item>Profession:{profession}</ListGroup.Item>
              <ListGroup.Item>Email:{email}</ListGroup.Item>
            </ListGroup>
            <div className="card-btn mt-3">
              <Card.Link as={Link} to={`/edit-contact/${id}`}>
                <Button variant="warning ms-3" size="md" type="view">
                  <FaPencilAlt />
                </Button>
              </Card.Link>
              <Card.Link>
                <Button
                  variant="danger ms-3"
                  size="md"
                  onClick={() => handleDelete(contact.id)}
                >
                  <FaRegTrashAlt />
                </Button>
              </Card.Link>
            </div>
          </Card.Body>
        </div>
      </Card>
      )}
      
    </>
  );
}

export default ContactDetails;
