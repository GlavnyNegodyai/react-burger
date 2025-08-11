import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import './app-header.css';

const AppHeader = () => {
    return(
        <header className='header'>
            <div className='header__content-wrapper p-4'>
            <nav className='header-nav'>
                <div className='header-element'>
                    <BurgerIcon type='primary'/>
                    <span className='text text_type_main-default'>Конструктор</span>
                </div>
                <div className='header-element'>
                    <ListIcon type='secondary' />
                    <span className='text text_type_main-default'>Лента заказов</span>
                </div>
            </nav>
            <Logo />
            <div className='header-element'>
                <ProfileIcon type='secondary' />
                <span className='text text_type_main-default'>Конструктор</span>
            </div>
            </div>
        </header>
    );
}

export default AppHeader;