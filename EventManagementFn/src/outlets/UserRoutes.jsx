import React from 'react';
import { decodeToken } from 'react-jwt';
import { Outlet, Navigate } from 'react-router-dom';

const userRoutes = () => {
  const token = localStorage.getItem('token');

if(token !== null){
    const tokenDecoded = decodeToken(token);

    return tokenDecoded ? <Outlet /> : <Navigate to='login' />;

}
else{
    return <Navigate to='login' />
}
};

export default userRoutes;