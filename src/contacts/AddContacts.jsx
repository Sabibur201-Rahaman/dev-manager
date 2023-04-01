import React, { useEffect, useState } from 'react'
// import { Col, Row } from 'react-bootstrap'
import{Form,Button,Row,Col}from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {toast} from 'react-toastify'
const schema=yup.object({
  first_name:yup
  .string()
  .required('first_name is required')
  .min(3,'first_name is required'),
  last_name:yup
  .string()
  .required('last_name is required')
  .min(3,'last_name is required'),
  profession:yup
  .string()
  .required('profession is required')
  // .oneOf(['developer','designer','marketer'])
  .min(3,'profession is must be entered'),
  
  bio:yup
  .string()
  .required('bio is required')
  .min(10,'bio must be required')
  .max(300,'profession is must be entered'),
picture:yup
// .url('url must be entered')
.string()
.required('picture url is must be entered'),
email:yup
.string()
.required('email is required')
.email('email must be valid'),
gender:yup
.mixed()
.required()
.oneOf(['male','female'])
})
 function AddContacts({addContacts,updateContact,contact1}) {
  console.log(contact1)
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
      const { register, handleSubmit, watch,setValue,reset,formState: { errors,isSubmitting,isSubmitSuccessful} } = useForm({
        resolver:yupResolver(schema),
      });
      console.log(errors)
      const handleChange=(evt)=>{
        setContact({
          ...contact,
          [evt.target.name]:evt.target.value
        })
      }
      const defaultValue={
        first_name:contact1?.first_name||'sabibur',
        last_name:contact1?.last_name||'Rahaman',
        profesion:contact1?.profesion||'developer',
        email:contact1?.email||'sabiburrahaman720@gmail.com',
        bio:contact1?.bio||'helllo i am from developing stream',
        picture:contact1?.picture||'https://randomuser.me/api/portraits/men/1.jpg',
        gender:contact1?.gender||'male'
      }
      const{first_name,last_name,bio,gender,email,profession,picture,}=defaultValue
      useEffect(()=>{
        reset({
          first_name:'',
          last_name:'',
          bio:'',
          email:'',
          profession:'',
          gender:'',
          dob:'',
          picture:'',
        })
      },[isSubmitSuccessful])
      const [birthYear, setBirthYear] = useState(new Date())
      useEffect(()=>{
        setValue('dob','birthYear')
      },[birthYear])
    
  // const{first_name,last_name,profession,gender,dob,bio,email,picture}=contact
  const onSubmit=(data)=>{
    toast.success('contact successfully added')
    addContacts(data)
// console.log(data)
  }
  return (
    <div>
      <h2 className='mt-5 text-center'>AddContacts</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
         <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='first_name' column>FirstName</Form.Label>
          </Col>
          <Col sm={9}>
          <Form.Control
          input type='text'
          id='first_name'
          defaultValue={first_name}
          {...register('first_name')}
          isinValid={errors?.first_name}
          placeholder='Enter your firstname'
         />
          <Form.Control.Feedback type='invalid'className='d-block'>
          {errors?.first_name?.message}
          </Form.Control.Feedback>
          </Col>
         
        </Form.Group> 
         <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='last_name' column>LastName</Form.Label>
          </Col>
          <Col sm={9}>
          <Form.Control
          input type='text'
          id='last_name'
          defaultValue={last_name}
          {...register('last_name')}
          isinValid={errors?.last_name}
          placeholder='Enter your LastName'
         />
          <Form.Control.Feedback type='invalid'className='d-block'>
          {errors?.last_name?.message}
          </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
          <Form.Label htmlFor='profession' column>Profession</Form.Label>
          </Col>
          <Col sm={9}>
          <Form.Select {...register('profession')}aria-label="select your profession">
            id:'profession'
            defaultValue:{profession}
          isinValid={errors?.profession}
      <option value ='' disabled> select your profession</option>
      <option value="Developer">developer</option>
      <option value="Designer">designer</option>
      <option value="Marketer">marketer</option>
    </Form.Select>
          <Form.Control.Feedback type='invalid'className='d-block'>
          {errors?.profession?.message}
          </Form.Control.Feedback>
         
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
          defaultValue={email}
          {...register('email')}
          isinValid={errors?.email}
          placeholder='Enter your email'
         />
          <Form.Control.Feedback type='invalid'className='d-block'>
          {errors?.email?.message}
          </Form.Control.Feedback>
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
              dateFormat={'dd/MM/yyyy'}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
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
          label='male'
          value='male'
          {...register('gender')}
          // checked={gender==='male'}
          onChange={handleChange}
          name='gender'
         
          />
         </Col>
          </Col>
          <Col xs='auto'>
          <Form.Check
          input type='radio'
          id='gender'
          value='female'
          {...register('gender')}
          // checked={gender==='female'}
          onChange={handleChange}
          name='gender'
          label='female'
          />
          <Form.Control.Feedback type='invalid'className='d-block'>
          {errors?.gender?.message}
          </Form.Control.Feedback>
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
          defaultValue={bio}
          {...register('bio')}
          isinValid={errors?.bio}
          placeholder='Enter your bio'
         />
          <Form.Control.Feedback type='invalid'className='d-block'>
          {errors?.bio?.message}
          </Form.Control.Feedback>
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
          defaultValue={picture}
          {...register('picture')}
          isinValid={errors?.picture}
          placeholder='Enter your picture url'
         />
          <Form.Control.Feedback type='invalid'className='d-block'>
          {errors?.picture?.message}
          </Form.Control.Feedback>
          </Col>
        </Form.Group> 
        <Button variant='primary'size='md'type='submit'>Submit</Button>
      </Form>
    </div>
  )
}
export default AddContacts
