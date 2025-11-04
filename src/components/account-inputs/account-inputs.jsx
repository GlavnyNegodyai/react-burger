import React from 'react';
import './account-inputs.css';

const AccountInputs = ({children, headlineText, onSubmit}) => {
    return (
        <section className='account-inputs-wrapper'>
            {headlineText && <h1>{headlineText}</h1>}
            <div className="account-inputs">
                <form onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </section>
    );
}

export default AccountInputs;