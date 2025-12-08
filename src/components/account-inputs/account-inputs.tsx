import React, { FunctionComponent, ReactNode, FormEvent } from 'react';
import './account-inputs.css';

interface IAccountInputProps {
    children?: ReactNode;
    headlineText?: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const AccountInputs: FunctionComponent<IAccountInputProps> = ({children, headlineText, onSubmit}) => {
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