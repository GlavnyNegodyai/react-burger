import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser, removeUser } from '../../services/actions/user.js';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./profile.module.css";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        dispatch(removeUser(navigate));
    }

    const user = useSelector((store) => store.userReducer.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    let timer = useRef(null);

    const timeOutUserUpdate = () => {
        if(timer.current){
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            dispatch(updateUser(email, name));
        },
        5000 
        );
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
        timeOutUserUpdate();
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        timeOutUserUpdate();
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    


    return(
        <>
            <main className={styles.main}>
                <section className = {styles['nav-links-wrapper']}>
                    <nav className = {styles['nav-links']}>
                        <NavLink to="/profile" className={({ isActive }) =>
                        `text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}
                        >Профиль</NavLink>
                        <NavLink to="/profile/orders" className={({ isActive }) =>
                        `text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}>История заказов</NavLink>
                        <NavLink to="/" onClick={handleLogoutClick} className={
                        'text text_type_main-default text_color_inactive'}>Выход</NavLink>
                    </nav>

                </section>
                <section className='profile-inputs-wrapper'>
                    <div className="profile-inputs">
                        <Input
                            type={'text'}
                            placeholder={'text'}
                            value={name}
                            icon={'EditIcon'}
                            onChange={handleNameChange}
                            extraClass={styles.input}
                        />
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            value={email}
                            icon={'EditIcon'}
                            onChange={handleEmailChange}
                            extraClass={styles.input}
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
            </main>
        </>
    );
}

export default Profile;