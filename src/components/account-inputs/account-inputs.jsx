import React from 'react';
import './account-inputs.css';

const AccountInputs = ({children, headlineText}) => {
    return (
        <section className='account-inputs-wrapper'>
            {headlineText && <h1>{headlineText}</h1>}
            <div className="account-inputs">
                {children}
            </div>
        </section>
    );
}

export default AccountInputs;