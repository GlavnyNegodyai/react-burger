import React, { useEffect, useState, useRef } from 'react';
import styles from "./profile-inputs.module.css";
import { useDispatch, useSelector } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/actions/user';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';



export const ProfileInputs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const user = useSelector((store) => store.userReducer.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nameRef = useRef(name);
    const emailRef = useRef(email);

    useEffect(() => {
    nameRef.current = name;
    }, [name]);

    useEffect(() => {
    emailRef.current = email;
    }, [email]);


    useEffect(() => {
        
        dispatch(getUser(navigate));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    let timer = useRef<NodeJS.Timeout | null>(null);

    const timeOutUserUpdate = () => {
        if(timer.current){
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            console.log(emailRef.current, nameRef.current);
            
            dispatch(updateUser(emailRef.current, nameRef.current, navigate));
        },
        3000 
        );
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        timeOutUserUpdate();
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        timeOutUserUpdate();
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return(
        <section className='profile-inputs-wrapper'>
            <div className="profile-inputs">
                <Input
                    type={'text'}
                    placeholder={'text'}
                    value={name}
                    icon={'EditIcon'}
                    onChange={handleNameChange}
                    extraClass={styles.input}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    value={email}
                    icon={'EditIcon'}
                    onChange={handleEmailChange}
                    extraClass={styles.input}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
                <PasswordInput
                    placeholder={'Пароль'}
                    icon={'EditIcon'}
                    value={password}
                    onChange={handlePasswordChange}
                    extraClass={styles.input}
                />
            </div>
        </section>
    );
} 