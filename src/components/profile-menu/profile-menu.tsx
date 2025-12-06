import React from 'react';
import styles from "./profile-menu.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import { removeUser } from '../../services/actions/user';

export const ProfileMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        
        dispatch(removeUser(navigate));
    }
    return(
        <section className = {styles['nav-links-wrapper']}>
            <nav className = {styles['nav-links']}>
                <NavLink to="/profile" end className={({ isActive }) =>
                `text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}
                >Профиль</NavLink>
                <NavLink to="/profile/orders" className={({ isActive }) =>
                `text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}>История заказов</NavLink>
                <NavLink to="" onClick={handleLogoutClick} className={
                'text text_type_main-default text_color_inactive'}>Выход</NavLink>
            </nav>

        </section>
    );
}