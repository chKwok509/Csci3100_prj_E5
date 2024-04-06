'use client'
import styles from './loginPage.module.css';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    return (
        <body className={styles.body}>
            <form className={styles.form}>
            <h3 className={styles.form_h3}>Let'sBang</h3>

            <label htmlFor="username" className={styles.label}>Email</label>
            <input type="text" placeholder="Email or Phone" required id="username" className={styles.input}/>

            <label htmlFor="password" className={styles.label}>Password</label>
            <input type="password" placeholder="Password" required id="password" className={styles.input}/>

            <button  type="button" onClick={() => router.push('./Mainpage')} className={styles.button}>Log In</button>
                <div className={styles.social}>
                    <div className={styles.social_div}>Register Here By Email</div>
                    <div className={styles.social_div}>Forgot Your Password</div>
                    <br></br>
                </div>
            </form>
        </body>
    );
}