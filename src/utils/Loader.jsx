import React from 'react'
import { Spinner } from 'react-bootstrap'
function Loader() {
  return (
     <Spinner className='d-block mx-auto my-auto' animation="grow" />
  )
}

export default Loader
