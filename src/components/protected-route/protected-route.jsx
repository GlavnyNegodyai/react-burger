import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getRefreshToken } from '../../utils/auth-cookies.js'; 

export const ProtectedRouteElement = ({children, isNotForAuthorized}) => {
    const location = useLocation();
    const token = getRefreshToken();
    if (isNotForAuthorized){
        if(token && token !== ''){
            return <Navigate to="/"/>
        }
    }
    else{
        if (!token || token === '') 
            return (
                <Navigate to="/login" state={{from: location}} replace/>
            );
    }
    

    return children;
}