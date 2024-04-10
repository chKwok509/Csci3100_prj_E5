
import React, { useState } from "react";
import styles from "./Confirmation.module.css";

const Popupconfirm = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAccept = () => {
        // Handle accept logic here
        setIsOpen(false);
    };

    const handleDecline = () => {
        // Handle decline logic here
        setIsOpen(false);
    };

    return (
        <div className={styles.popup}>
            <h2>Confirmation</h2>
            <p>Are you sure you want to proceed?</p>
            <div className={styles.buttons}>
                <button onClick={handleAccept}>Accept</button>
                <button onClick={handleDecline}>Decline</button>
            </div>
        </div>
    );
};

export default Popupconfirm;

