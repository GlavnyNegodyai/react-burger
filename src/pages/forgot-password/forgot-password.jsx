import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { emailPost } from '../../services/actions/forgot-password.js';
import AccountInputs from '../../components/account-inputs/account-inputs.jsx';
import AccountPrompt from '../../components/account-prompt/account-prompt.jsx';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailSubmit = (e) => {
        e.preventDefault()
        dispatch(emailPost(email, navigate));
    }


    return(
            <main>
                <AccountInputs headlineText={"Восстановление пароля"} onSubmit={handleEmailSubmit}>
                    <Input
                        type={'email'}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={'Укажите e-mail'}
                    />
                    <Button htmlType='submit'>Восстановить</Button>
                    <AccountPrompt 
                        questionText={'Вспомнили пароль?'} 
                        linkText={'Войти'} 
                        toLink={'/login'}
                    />
                </AccountInputs>
            </main>
    );
}

export default ForgotPassword;