import React, { useEffect, useState,useContext } from "react";
// import { Col, Row } from 'react-bootstrap'
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../context/Contact.Context";
// import { ContactContext } from "../context/Contact.Context";
// import FormTextInput from "../layouts/FormTextInput";


const schema = yup.object({
  first_name: yup
    .string()
    .required("first_name is required")
    .min(3, "first_name is required"),
  last_name: yup
    .string()
    .required("last_name is required")
    .min(3, "last_name is required"),
  profession: yup
    .string()
    .required("profession is required")
    // .oneOf(['developer','designer','marketer'])
    .min(3, "profession is must be entered"),

  bio: yup
    .string()
    .required("bio is required")
    .min(10, "bio must be required")
    .max(300, "profession is must be entered"),
  picture: yup
    // .url('url must be entered')
    .string()
    .required("picture url is must be entered"),
  email: yup
    .string()
    .required("email is required")
    .email("email must be valid"),
  gender: yup.mixed().required().oneOf(["male", "female"]),
});
function AddContacts({contact}) {
  const{contacts,updateContact,addContacts}=useContext(ContactContext)
 
  // const [contact, setContact] = useState({
  //   first_name: "",
  //   last_name: "",
  //   profession: "",
  //   gender: "male",
  //   dob: "",
  //   bio: "",
  //   email: "",
  //   picture: "",
  // });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleChange = (evt) => {
    setContact({
      ...contact,
      [evt.target.name]: evt.target.value,
    });
  };
  const navigate = useNavigate();
  const defaultValue = {
    first_name: contact?.first_name || "sabibur",
    last_name: contact?.last_name || "Rahaman",
    profesion: contact?.profesion || "developer",
    email: contact?.email || "sabiburrahaman720@gmail.com",
    bio: contact?.bio || "helllo i am from developing stream",
    picture:
      contact?.picture || "https://randomuser.me/api/portraits/men/1.jpg",
    gender: contact?.gender || "male",
    dob: contact?.dob && new Date(contact?.dob) || new Date(),
  };
  const { first_name, last_name, bio, gender, email, profession, picture,dob } =
    defaultValue;
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        first_name: "",
        last_name: "",
        bio: "",
        email: "",
        profession: "",
        gender: "",
        dob: "",
        picture: "",
      });
    }
  }, [isSubmitSuccessful]);
  const [birthYear, setBirthYear] = useState(dob?dob:new Date());
  useEffect(() => {
    setValue("dob", birthYear);
  }, [birthYear]);
  const onSubmit = async (data) => {
    const id = contact?.id;
    if (id) {
      updateContact(data, id);
      toast.success("contact successfully Updated");
    } else {
      
      const isAdded= await addContacts(data);
      if(isAdded){
        toast.success("contact successfully added");
        navigate("/contacts");
      }else{
        toast.error('contact add failed')
      }
      
    }
    // navigate("/contacts");
  };
  return (
    <div>
      <h2 className="mt-5 text-center">
        {contact?.id ? "Edit Contact" : "Add Contacts"}
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
       <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="first_name" column>
              FirstName
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="first_name"
              defaultValue={first_name}
              {...register("first_name")}
              isInvalid={errors?.first_name}
              placeholder="Enter your firstname"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.first_name?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group> 
        
          <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="last_name" column>
              LastName
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="last_name"
              defaultValue={last_name}
              {...register("last_name")}
              isInvalid={errors?.last_name}
              placeholder="Enter your LastName"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.last_name?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="profession" column>
              Profession
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select
              {...register("profession")}
              aria-label="select your profession"
            >
              id:'profession' defaultValue:{profession}
              isInValid={errors?.profession}
              <option value="" disabled>
                {" "}
                select your profession
              </option>
              <option value="developer">developer</option>
              <option value="designer">designer</option>
              <option value="marketer">marketer</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.profession?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="email" column>
              Email
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="email"
              defaultValue={email}
              {...register("email")}
              isInvalid={errors?.email}
              placeholder="Enter your email"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.email?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="dob" column>
              DOB
            </Form.Label>
          </Col>
          <Col sm={3}>
            <DatePicker
              selected={birthYear}
              name="dob"
              // onChange={handleChange}
              id="dob"
              placeholder="Enter your Date of Birth"
              maxDate={new Date()}
              dateFormat={"dd/MM/yyyy"}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={(date) =>{
                return setBirthYear(date)
              } }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="gender" column>
              Gender
            </Form.Label>
          </Col>
          <Col sm={2}>
            <Col xs="auto">
              <Form.Check
                type="radio"
                label="male"
                value="male"
                {...register("gender")}
                defaultChecked={gender === "male"}
                onChange={handleChange}
                name="gender"
              />
            </Col>
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              id="gender"
              value="female"
              {...register("gender")}
              defaultChecked={gender === "female"}
              onChange={handleChange}
              name="gender"
              label="female"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.gender?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="bio" column>
              Bio
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="bio"
              defaultValue={bio}
              {...register("bio")}
              isInvalid={errors?.bio}
              placeholder="Enter your bio"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.bio?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="email" column>
              Picture
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="picture"
              defaultValue={picture}
              {...register("picture")}
              isInvalid={errors?.picture}
              placeholder="Enter your picture url"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.picture?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>  
        <Button variant="primary" size="md" type="submit">
          {contact?.id ? "Update Contact" : "Add Contacts"}
          
        </Button>
      </Form>
    </div>
  );
}
export default AddContacts;
