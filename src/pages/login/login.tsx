import React, { useState } from 'react';
import { useDispatch } from '../../services/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/actions/login';
import AccountInputs from '../../components/account-inputs/account-inputs';
import AccountPrompt from '../../components/account-prompt/account-prompt';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(loginUser({email, password, fromPage}, navigate));
    }

    return(
            <main>
                <AccountInputs headlineText={"Вход"} onSubmit={handleClick}>
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                        />
                        <PasswordInput
                            placeholder={'Пароль'}
                            icon={'ShowIcon'}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <Button htmlType={'submit'}>Войти</Button>
                    <AccountPrompt 
                        questionText={'Вы — новый пользователь?'} 
                        linkText={'Зарегистрироваться'} 
                        toLink={'/register'}
                    />
                    <AccountPrompt 
                        questionText={'Забыли пароль?'} 
                        linkText={'Восстановить пароль'} 
                        toLink={'/forgot-password'}
                    />
                </AccountInputs>
            </main>
    );
}

export default Login;