import React, { useState, useEffect } from 'react';

function SystemTime() {
    const [time, setTime] = useState(new Date());
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    // Don't render the time until after the component has mounted
    if (!hasMounted) {
        return null;
    }

    return (
        <p>{time.toLocaleTimeString()}</p>
    );
}

export default SystemTime;