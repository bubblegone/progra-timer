import { useEffect, useState } from 'react';

interface Timer {
    secondsLeft: number;
    start: () => void;
    stop: () => void;
    reset: () => void;
    hasFinished: boolean;
}

const useTimer = (seconds: number, callback?: () => void): Timer => {
    const [secondsLeft, setSecondsLeft] = useState(seconds);
    const [hasFinished, setFinished] = useState(true);
    const [currentInterval, setCurrentInterval] = useState<number>();

    useEffect(() => {
        stop();
        setSecondsLeft(seconds);
    }, [seconds]);

    useEffect(() => {
        if (secondsLeft <= 0 && !hasFinished) {
            if (callback) {
                callback();
            }
            setFinished(true);
            clearInterval(currentInterval);
        }
    }, [secondsLeft]);

    const stop = () => {
        clearInterval(currentInterval);
        setFinished(true);
    };

    const reset = () => {
        stop();
        setSecondsLeft(seconds);
    };

    const start = () => {
        if (!hasFinished) {
            stop();
        }

        const interval = setInterval(() => {
            setSecondsLeft(secondsLeft => (secondsLeft - 0.01 > 0 ? secondsLeft - 0.01 : 0));
        }, 10);
        setCurrentInterval(interval);
        setFinished(false);
    };

    return { secondsLeft, start, stop, reset, hasFinished };
};

export default useTimer;
