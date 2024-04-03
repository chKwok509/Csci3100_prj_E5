import React from "react";
import { useState } from "react";
import styles from "./Popuprule.module.css";

const Popuprule= () => {
    const [showModal,setShowModal] = useState(false);
    return (
        <div>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span onClick={() => setShowModal(false)} className={styles.close}>Close</span>
                        <p>1. The Game is played by two player on a grid</p>
                        <br></br>
                        <p>2. You can choose O or X as your mark</p>
                        <br></br>
                        <p>3. In order to win the game, player should make five continuous same mark for horizontal,vertical or diagonal row</p>
                        <br></br>
                        <p>4. Enjoy the game</p>
                    </div>
                </div>
            )}
            <button
                className={styles.rule_link}
                onClick={() => setShowModal(true)}>Rules
            </button>
        </div>
    );
}

export default Popuprule;