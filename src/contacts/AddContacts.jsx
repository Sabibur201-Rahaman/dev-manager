import React, { useState } from 'react'
// import { Col, Row } from 'react-bootstrap'
import{Form,Button,Row,Col}from 'react-bootstrap'
import DatePicker from "react-datepicker";
function AddContacts() {
  const[contact,setContact]=useState({
    first_name:'',
    last_name:'',
    profession:'',
    gender:'male',
    dob:'',
    bio:'',
    email:'',
    picture:''
  })
  const handleChange=(evt)=>{
    setContact({
      ...contact,
      [evt.target.name]:evt.target.value
    })
  }
  const [birthYear, setBirthYear] = useState(new Date())
  const handleSubmit=(evt)=>{
evt.preventDefault()
console.log(contact)
  }
//   const handleDateChange = (date) => {
//     setContact({
// ...contact,
//       dob: date,
//     });
//   };
  const{first_name,last_name,profession,gender,dob,bio,email,picture}=contact
  return (
    <div>
      <h2 className='mt-5 text-center'>AddContacts</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='first_name' column>FirstName</Form.Label>
          </Col>
          <Col sm={9}>
          <Form.Control
          input type='text'
          id='first_name'
          value={first_name}
          onChange={handleChange}
          name='first_name'
          placeholder='Enter your firstname'
          />
         
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='last_name' column>LastName</Form.Label>
          </Col>
          <Col sm={9}>
          <Form.Control
          input type='text'
          id='first_name'
          value={last_name}
          onChange={handleChange}
          name='last_name'
          placeholder='Enter your LastName'
          />
         
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='profession' column>Profession</Form.Label>
          </Col>
          <Col sm={9}>
          <Form.Control
          input type='text'
          id='profession'
          value={profession}
          onChange={handleChange}
          name='profession'
          placeholder='Enter your profession'
          />
         
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='email' column>Email</Form.Label>
          </Col>
          <Col sm={9}>
          <Form.Control
          input type='text'
          id='email'
          value={email}
          onChange={handleChange}
          name='email'
          placeholder='Enter your email'
          />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='dob' column>DOB</Form.Label>
          </Col>
          <Col sm={3}>
        <DatePicker
          selected={birthYear}
              name='dob'
              // onChange={handleChange}
              id='dob'
              placeholder='Enter your Date of Birth'
              maxDate={new Date()}
              showYearDropdown
              onChange={(date) => setBirthYear(date)}
          />
          </Col> 
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='gender' column>Gender</Form.Label>
          </Col>
          <Col sm={2}>
            <Col xs='auto'>
          <Form.Check
          input type='radio'
          id='gender'
          value='male'
          checked={gender==='male'}
          onChange={handleChange}
          name='gender'
          label='male'
          />
         </Col>
          </Col>
          <Col xs='auto'>
          <Form.Check
          input type='radio'
          id='gender'
          value='female'
          checked={gender==='female'}
          onChange={handleChange}
          name='gender'
          label='female'
          />
         </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='bio' column>Bio</Form.Label>
          </Col>
          <Col sm={9}>
          <Form.Control
          input type='text'
          id='bio'
          value={bio}
          onChange={handleChange}
          name='bio'
          placeholder='Enter your Bio'
          />
         </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='email' column>Picture</Form.Label>
          </Col>
          <Col sm={9}>
          <Form.Control
          input type='text'
          id='picture'
          value={picture}
          onChange={handleChange}
          name='picture'
          placeholder='Enter your picture link '
          />
          </Col>
        </Form.Group>
        <Button variant='primary'size='md'type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default AddContacts
