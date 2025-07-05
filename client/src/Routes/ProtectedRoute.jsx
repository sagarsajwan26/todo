import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

function ProtectedRoute() {
  const isLoggedIn= localStorage.getItem("isLoggedIn")
  console.log(isLoggedIn);
const navigate= useNavigate()
useEffect(()=>{
    if(!isLoggedIn) navigate('/')
},[isLoggedIn])

  
  return isLoggedIn&& (
    <div><Outlet/></div>
  )
}

export default ProtectedRoute