import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser, removeUser } from '../../services/actions/user';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./profile.module.css";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        //@ts-ignore
        dispatch(removeUser(navigate));
    }

    //@ts-ignore
    const user = useSelector((store) => store.userReducer.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        //@ts-ignore
        dispatch(getUser());
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
            console.log("Данные изменены");
            console.log(email, name);
            //@ts-ignore
            dispatch(updateUser(email, name));
        },
        5000 
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
        </main>
    );
}

export default Profile;