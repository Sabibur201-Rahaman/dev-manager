import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'
import { useLocation,Navigate } from 'react-router-dom'

function PublicRoute({children}) {
    const{user}=useContext(AuthContext)
    const location=useLocation()
    const loadedComp=user?(<Navigate to={location?.state?.from?location?.state?.from:'/contacts'}/>):(children)
  return (
    <div>
      {loadedComp}
    </div>
  )
}

export default PublicRoute
