import React, { useContext } from "react";
import AddContacts from "../contacts/AddContacts";
import { useNavigate, useParams } from "react-router-dom";
import { ContactContext } from "../context/Contact.Context";
// import { ContactContext } from "../context/Contact.context";

function EditContact() {
  const navigate=useNavigate()
  const { id } = useParams();
  const { contacts } = useContext(ContactContext);
  const foundContact = contacts.find((contact) => contact.id === +id);
  navigate("/contacts");
  return (
    <div>
      <AddContacts contact={foundContact} />
    </div>
  );
}

export default EditContact;

//