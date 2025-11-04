import React from 'react';
import './account-prompt.css';
import { Link } from 'react-router-dom';

const AccountPrompt = ({questionText, linkText, toLink}) => {
    return(
        <p>
            <span>{questionText}</span>&nbsp;
            <Link to={toLink}>{linkText}</Link>
        </p>
    );
}

export default AccountPrompt;