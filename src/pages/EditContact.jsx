import React, { useContext } from "react";
import AddContacts from "../contacts/AddContacts";
import { useParams } from "react-router-dom";
import { ContactContext } from "../context/Contact.Context";

function EditContact() {
  const { id } = useParams();
  const { contacts } = useContext(ContactContext);
  const foundContact = contacts.find((contact) => contact.id === id);

  return (
    <div>
      <AddContacts contact={foundContact} />
    </div>
  );
}

export default EditContact;

//