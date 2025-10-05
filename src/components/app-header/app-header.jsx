import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import './app-header.css';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    return(
        <header className='header'>
            <div className='header__content-wrapper p-4'>
            <nav className='header-nav'>
                <div className='header-element'>
                    <BurgerIcon type='primary'/>
                    <NavLink to="/" className={({ isActive }) =>
                        `text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}
                    >Конструктор</NavLink>
                </div>
                <div className='header-element'>
                    <ListIcon type='secondary' />
                    <NavLink to="/profile/orders" className={({ isActive }) =>
                        `text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}
                    >Лента заказов</NavLink>
                </div>
            </nav>
            <Logo />
            <div className='header-element'>
                <ProfileIcon type='secondary' />
                <NavLink to="/profile" end className={({ isActive }) =>
                        `text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}
                >Личный кабинет</NavLink>
            </div>
            </div>
        </header>
    );
}

export default AppHeader;