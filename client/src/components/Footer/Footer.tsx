import React from 'react';
import styles from './Footer.module.scss';

const Footer = ():JSX.Element => {
    return (
        <footer className={styles.footer}>
           <p>Coded by Karol Chilimoniuk</p>
        </footer>
    );
}

export default Footer;