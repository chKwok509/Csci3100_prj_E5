'use client'
import styles from './registerpage.module.css';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react'; // Import necessary types

export default function RegisterPage() {
    const router = useRouter();
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => { // Specify the correct event type
        setName(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => { // Specify the correct event type
        setPassword(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => { // Specify the correct event type
        event.preventDefault();
        // Do something with the name and password values, such as sending them to a server
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        }).then(response => {
            if (response.ok) {
                // Redirect the user to the login page
                router.push('/Page/Loginpage');
            } else {
                // Display an error message to the user
                alert('Repeated username or password!');
            }
        });
    };

    return (
        <body className={styles.body}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.h3}>Sign Up</h3>
                <label htmlFor="username" className={styles.label}>Username</label>
                <input type="text" name="name" placeholder="Name" id="username" className={styles.input} value={username} onChange={handleNameChange} />

                <label htmlFor="password" className={styles.label}>Password</label>
                <input type="password" name="password" placeholder="Password" id="password" className={styles.input} value={password} onChange={handlePasswordChange} />
                <br></br>
                <input type="submit" className={styles.submitbon} value="Create Account" />
            </form>
                <button className={styles.go} onClick={() => router.push('/Page/Loginpage')}>Go Back</button>
        </body>
    );
}