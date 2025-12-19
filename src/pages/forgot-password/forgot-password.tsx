import React, { useState } from 'react';
import { useDispatch } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { emailPost } from '../../services/actions/forgot-password';
import AccountInputs from '../../components/account-inputs/account-inputs';
import AccountPrompt from '../../components/account-prompt/account-prompt';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
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