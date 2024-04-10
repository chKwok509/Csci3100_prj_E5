import React, { useEffect, useState } from 'react';

export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 59) {
                    setMinutes((prevMinutes) => {
                        if (prevMinutes === 59) {
                            setHours((prevHours) => prevHours + 1);
                            return 0;
                        }
                        return prevMinutes + 1;
                    });
                    return 0;
                }
                return prevSeconds + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function pad(val: number) {
        return val > 9 ? val : "0" + val;
    }

    return (
        <div id="timer">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </div>
    );
}
