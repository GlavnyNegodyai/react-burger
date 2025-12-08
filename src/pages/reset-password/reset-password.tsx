import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { passwordReset } from '../../services/actions/reset-password';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import AccountInputs from '../../components/account-inputs/account-inputs';
import AccountPrompt from '../../components/account-prompt/account-prompt';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [emailedToken, setEmailedToken] = useState('');
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(passwordReset(newPassword, emailedToken, navigate));
    }
    if(!location.state || !location.state.fromForgotPassword){
        return <Navigate to="/forgot-password" replace/>;
    }
    return(
        <main>
            <AccountInputs headlineText={"Восстановление пароля"} onSubmit={onButtonClick}>
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
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                    <Button htmlType="submit">Сохранить</Button>
                <AccountPrompt 
                    questionText={'Вспомнили пароль?'} 
                    linkText={'Войти'} 
                    toLink={'/login'}
                />
            </AccountInputs>
        </main>
    );
}

export default ResetPassword;