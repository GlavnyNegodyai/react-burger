import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/actions/register.js';
import AccountInputs from '../../components/account-inputs/account-inputs.jsx';
import AccountPrompt from '../../components/account-prompt/account-prompt.jsx';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const clickHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser({email, password, name}, navigate));
    }

    return(
        <main>
            <AccountInputs headlineText={"Регистрация"} onSubmit={clickHandler}>
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
                    <Button htmlType='submit'>Зарегистрироваться</Button>
                <AccountPrompt 
                    questionText={'Уже зарегистрированы?'} 
                    linkText={'Войти'} 
                    toLink={'/login'}
                />
            </AccountInputs>
        </main>
    );
}

export default Register;