import React from 'react';
import './page-not-found.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return(
    <>
        <main className="main--error">
            <section className='mt-25 error-section'>
                <h1 className='error-message text text_type_main-large'>
                    Ошибка 404
                    </h1>
                <p className='text text_type_main-medium mt-5 mb-5 text_color_inactive'>
                    Это значит, что данная страница недоступна или не существует.
                </p>
                <Link to='/' className='text_type_main-default mt-20'>Вернуться на главную страницу</Link>
            </section>
        </main>
    </>
    )
}

export default PageNotFound;
