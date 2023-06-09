import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { Form,Button,Col,Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import FormTextInput from '../layouts/FormTextInput';
import { toast } from "react-toastify";
import { useContext } from 'react';
import { Link,useSearchParams,useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth.Context';
import { axiosPublicInstance } from '../config/axios';
const schema = yup.object({
  password: yup
  .string()
  .required('password is required')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
    'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
  ),
confirmPassword: yup
  .string()
  .required('confirm Password is Required')
  .oneOf([yup.ref('password')], "confirm password doesn't match"),
})
function ResetPassword() {
  const[searchParams]=useSearchParams()
  const navigate = useNavigate()
  const code=searchParams.get('code')
  // console.log(code)
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
      const response=await axiosPublicInstance.post('/auth/reset-password',{
        code:code,
        password:data.password,
       passwordConfirmation:data.confirmPassword
      })
      console.log(response.data)
      toast.success(
        'Password resetted successfully, now you can login with updated password'
      )
      navigate('/login')
    }catch(err){
      console.log(err.response)
      toast.error('Issue in Resetting password please try again')
    }
  }
   return (
    <>
    <div>
      <h2 className='mt-5 text-center'>Reset Password</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
      
        <FormTextInput
          name='password'
          type='password'
          label='password'
          placeholder='Enter password '
          errors={errors}
          register={register}
       
        />
         <FormTextInput
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          placeholder='Enter Confirm password '
          errors={errors}
          register={register}
       
        />
        <Button
          variant='primary'
          size='md'
          type='submit'
          disabled={isSubmitting ? 'disabled' : ''}
          className='text-center d-inline-block w-auto'
        >
         Reset Password
        </Button>
      </Form>
    </div>
    </>
  )
}


export default ResetPassword
