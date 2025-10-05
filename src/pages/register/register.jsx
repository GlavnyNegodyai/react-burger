import React, {useState} from 'react';
import AppHeader from '../../components/app-header/app-header.jsx';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/actions/register.js';
import AccountInputs from '../../components/account-inputs/account-inputs.jsx';
import AccountPrompt from '../../components/account-prompt/account-prompt.jsx';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const Register = () => {
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const clickHandler = () => {
        dispatch(registerUser(name, password, email));
    }

    return(
        <>
            <AppHeader/>
            <main>
                <AccountInputs headlineText={"Регистрация"}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <PasswordInput
                            placeholder={'Пароль'}
                            icon={'ShowIcon'}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <Button onClick={clickHandler} htmlType='button'>Зарегистрироваться</Button>
                    <AccountPrompt 
                        questionText={'Уже зарегистрированы?'} 
                        linkText={'Войти'} 
                        toLink={'/login'}
                    />
                </AccountInputs>
            </main>
        </>
    );
}

export default Register;