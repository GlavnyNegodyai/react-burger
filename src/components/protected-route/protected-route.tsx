import React, { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getRefreshToken } from '../../utils/auth-cookies';

type ProtectedRouteElementProps = {
    children: ReactNode;
    isNotForAuthorized: boolean;
};

export const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({children, isNotForAuthorized}) => {
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
    

    return <>{children}</>;
}