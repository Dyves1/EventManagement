import React from 'react';
import { decodeToken } from 'react-jwt';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';

const AdminRoutes = () => {
    
  const token = localStorage.getItem('token');

if(token !== null){
    const tokenDecoded = decodeToken(token);
  
    const isAdmin =tokenDecoded.isAdmin

    return isAdmin ? <Outlet /> : <Navigate to='/admin/unauthorized' />;

}
else{
    return <Navigate to='/admin/unauthorized' />
}
};

export default AdminRoutes;