import React from 'react'
import { useAuthStore } from '../../stores/AuthStore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const user = useAuthStore((state)=>state.user) ;
    if(!user) <Navigate to="/login"/>
  return children;
}

export default ProtectedRoute