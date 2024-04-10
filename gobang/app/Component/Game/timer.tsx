import React, { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    function pad(val: number) {
        return val > 9 ? val : "0" + val;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 59) {
                    setMinutes(prevMinutes => prevMinutes + 1);
                    return 0;
                }
                return prevSeconds + 1;
            });

            setMinutes(prevMinutes => {
                if (prevMinutes === 59) {
                    setHours(prevHours => prevHours + 1);
                    return 0;
                }
                return prevMinutes;
            });
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="timer">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </div>
    );
}

export default Timer;