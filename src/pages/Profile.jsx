import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'
import { Button, Form,ProgressBar } from 'react-bootstrap'
import { useState } from 'react'
import { axiosPrivateInstance } from '../config/axios'
import Loader from '../utils/Loader'

const uploadPercentage=(loaded,completed)=>{
return Math.floor((completed/loaded)*100)
}
function Profile() {
  const[file,setFile]=useState(null)
  const[submitting,setsubmitting]=useState(false)
  const[percentage,setPercentage]=useState(0)
  const[imageURL,setImageURL]=useState(null)
  const handleChange=(evt)=>{
    console.log(evt.target.files)
    setFile(evt.target.files[0])
  }
  const {user}=useContext(AuthContext)
  const {username,email}=user
  const handleSubmit=async(evt)=>{
    evt.preventDefault()
    const data={
      firstName:'sabibur',
      lastName:'Rahaman',
      user:user.id
    }
    const formData=new FormData()
    formData.append('files.profilePicture',file,file.name)
    formData.append('data',JSON.stringify(data))
    // alone image load
    //along with resource creation
    //upload file to the server
    try{
      setsubmitting(true)
      const response=await axiosPrivateInstance.post('/profiles?populate=*',formData,
      {
        onUploadProgress:(progress)=>{
          const percentage=uploadPercentage(progress.total,progress.loaded)
          setPercentage(percentage)
        }
       
      }
      )
      setImageURL(response.data.data.attributes?.profilePicture?.data?.attributes?.url)
      setsubmitting(false)
      console.log(response.data)
      console.log()
    }catch(err){
      // console.log(err)
    }
  }
  // console.log(imageURL)
  return (
    <>
    <h2>profile</h2>
    <p>userName:<em>{username}</em></p>
    <p>email:<em>{email}</em></p>

    {imageURL && <img src={imageURL} alt='profile image' />}
    {percentage> 0 && submitting&&<ProgressBar striped variant="success" now={percentage} />}
    <Form onSubmit={handleSubmit}>
    <label htmlFor='profilePicture'>profilePicture</label>
      <input type='file'
      accept='image/*'
      name='profilePicture'
      id='profilePicture'
      onChange={handleChange}
      />
      
      <Button type='submit' variant='primary'disabled={submitting}>Upload File</Button>
    </Form>
    </>
  )
}

export default Profile
