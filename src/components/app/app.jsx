import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  Constructor,
  IngredientPage,
  Login,
  PageNotFound,
  Profile,
  Register,
  ResetPassword,
  ForgotPassword,
  Orders
} from '../../pages';
import { ModalWindow } from '../modal-window/modal-window.jsx';
import { ProtectedRouteElement } from '../protected-route/protected-route.jsx';
import styles from './app.module.css';

function App() {
  const location = useLocation();
  const state = location.state;
  const background = state && state.background;

  const [isModalOpened, setModalOpened] = useState(false);

  const handleModal = () => {
    setModalOpened(prev => !prev);
  };
  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<Constructor handleModal={handleModal}/>}/>

        <Route path='/login' element={
          <ProtectedRouteElement isNotForAuthorized={true}>
            <Login />
          </ProtectedRouteElement>
        }/>

        <Route path='/reset-password' element={
          <ProtectedRouteElement isNotForAuthorized={true}>
            <ResetPassword />
          </ProtectedRouteElement>
        }/>

        <Route path='/forgot-password' element={
          <ProtectedRouteElement isNotForAuthorized={true}>
            <ForgotPassword />
          </ProtectedRouteElement>
        }/>

        <Route path='/register' element={
          <ProtectedRouteElement isNotForAuthorized={true}>
            <Register />
          </ProtectedRouteElement>
        }/>

        <Route path='/profile' element={
          <ProtectedRouteElement isNotForAuthorized={false}>
            <Profile />
          </ProtectedRouteElement>}/>

        <Route path='/ingredients/:id' element={
          <IngredientPage />
          }/>

        <Route path='/profile/orders' element=
        {
        <ProtectedRouteElement isNotForAuthorized={false}>
          <Orders/>
        </ProtectedRouteElement>
        }/>

        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      
      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={<ModalWindow/>}/>
        </Routes>
      )}
    </>

  );
}

export default App;
