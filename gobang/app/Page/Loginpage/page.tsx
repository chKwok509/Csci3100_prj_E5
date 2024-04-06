'use client'
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react'; // Import necessary types
import styles from './loginpage.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => { // Specify the correct event type
        setName(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => { // Specify the correct event type
        setPassword(event.target.value);
    };

    const handleLogin = (event: FormEvent<HTMLFormElement>) => { // Specify the correct event type
        event.preventDefault();
        // Do something with the name and password values, authenticate the user
        fetch('/api/authuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        }).then(response => {
            if (response.ok) {
                // Redirect the user to the home page
                router.push('/Page/Mainpage');
            } else {
                // Display an error message to the user
                alert('Invalid username or password!');
            }
        });
    };


    return (
        <body className={styles.body}>
            <form className={styles.form} onSubmit={handleLogin}>
                <h3 className={styles.form_h3}>Let'sBang</h3>

                <label htmlFor="username" className={styles.label}>Email</label>
                <input
                    type="text"
                    placeholder="Email or Phone"
                    required
                    id="username"
                    className={styles.input}
                    value={username}
                    onChange={handleUsernameChange}
                />

                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    className={styles.input}
                    value={password}
                    onChange={handlePasswordChange}
                />

                <input type="submit" className={styles.button} value="Login" />
                <div className={styles.social}>
                    <button className={styles.social_div} onClick={() => router.push('./Registerpage')}>Register Here</button>
                    <div className={styles.social_div}>Forgot Your Password</div>
                    <br></br>
                </div>
            </form>
        </body>
    );
}