import React, {FunctionComponent} from 'react';
import './account-prompt.css';
import { Link } from 'react-router-dom';

interface IAccountPromptProps {
    questionText: string;
    linkText: string;
    toLink: string;
};

const AccountPrompt: FunctionComponent<IAccountPromptProps> = ({questionText, linkText, toLink}) => {
    return(
        <p>
            <span>{questionText}</span>&nbsp;
            <Link to={toLink}>{linkText}</Link>
        </p>
    );
}

export default AccountPrompt;