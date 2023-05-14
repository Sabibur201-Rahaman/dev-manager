import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { Form,Button,Col,Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import FormTextInput from '../layouts/FormTextInput';
import { toast } from "react-toastify";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth.Context';
import { axiosPrivateInstance, axiosPublicInstance } from '../config/axios';
const schema = yup.object({
  email: yup.string().email().required('Email is Required'),
})
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit=async(data)=>{
    try{
      const response= await axiosPublicInstance.post('/auth/forgot-password/',{
        email:data.email,
      })
      console.log(response.data)
      toast.success('Email is sent successfully with password reset link ')
    }catch(err){
      console.log(err.response)
    }
    
  }
   return (
    <>
    <div>
      <h2 className='mt-5 text-center'>Forgot Password</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
      
        <FormTextInput
          name='email'
          label='Email'
          placeholder='Enter Your Email'
          errors={errors}
          register={register}
          defaultValue='sabiburrahaman720@gmail.com'
        />
        <Button
          variant='primary'
          size='md'
          type='submit'
          disabled={isSubmitting ? 'disabled' : ''}
          className='text-center d-inline-block w-auto'
        >
         submit
        </Button>
      </Form>
    </div>
    </>
  )
}


export default ForgotPassword
