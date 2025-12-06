import React from 'react';
import styles from "./profile.module.css";
import { ProfileMenu } from '../../components/profile-menu/profile-menu';
import { ProfileInputs } from '../../components/profile-inputs/profile-inputs';
const Profile = () => {
    return(
        <main>
            <div className={styles.wrapper}>
                <ProfileMenu/>
                <ProfileInputs/>
            </div>
        </main>
    );
}

export default Profile;