
import React, { useState } from "react";
import styles from "./Confirmation.module.css";

// Popup confirm component
const Popupconfirm = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleAccept = () => {
        // Handle accept logic here
        setIsOpen(false);
        return true;
    };

    const handleDecline = () => {
        // Handle decline logic here
        setIsOpen(false);
        return false;
    };
    return (
        <div>
            {isOpen && (
                <div className={styles.confirmation_popup}>
                    <p className={styles.confirmation_popup_p}>1. Do you want to accept the regret request?</p>
                    <br></br>
                    <button onClick={handleAccept} className={styles.confirmation_button}>Yes</button>
                    <button onClick={handleDecline} className={styles.confirmation_button}>No</button>
                </div>
            )}
        </div>
    );
};

export default Popupconfirm;

