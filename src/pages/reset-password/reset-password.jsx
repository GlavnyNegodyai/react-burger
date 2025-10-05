import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { passwordReset } from '../../services/actions/reset-password.js';
import { useLocation, Navigate } from 'react-router-dom';
import AppHeader from '../../components/app-header/app-header.jsx';
import AccountInputs from '../../components/account-inputs/account-inputs.jsx';
import AccountPrompt from '../../components/account-prompt/account-prompt.jsx';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [emailedToken, setEmailedToken] = useState('');
    const location = useLocation();

    const dispatch = useDispatch();

    const onButtonClick = () => {
        dispatch(passwordReset(newPassword, emailedToken));
    }
    if(!location.state || !location.state.fromForgotPassword){
        return <Navigate to="/forgot-password" replace/>;
    }
    return(
        <>
            <AppHeader/>
            <main>
                <AccountInputs headlineText={"Восстановление пароля"}>
                        <PasswordInput
                            placeholder={'Введите новый пароль'}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            value={emailedToken}
                            onChange={e => setEmailedToken(e.target.value)}
                        />
                        <Button onClick={onButtonClick} htmlType="button">Сохранить</Button>
                    <AccountPrompt 
                        questionText={'Вспомнили пароль?'} 
                        linkText={'Войти'} 
                        toLink={'/login'}
                    />
                </AccountInputs>
            </main>
        </>
    );
}

export default ResetPassword;