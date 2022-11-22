import clsx from 'clsx';
import { useEffect, useState } from 'react';
import useTimer from '../hooks/useTimer';
import { useTimerStore } from '../store/timerStore';

const pad = (value: number) => {
    return String(value).padStart(2, '0');
};

const convertToClockFormat = (seconds: number) => {
    const displaySeconds = seconds % 60;
    const displayMinutesInSeconds = (seconds - displaySeconds) % 3600;
    const displayMinutes = displayMinutesInSeconds / 60;
    const displayHours = (seconds - displaySeconds - displayMinutesInSeconds) / 3600;
    return `${pad(displayHours)}:${pad(displayMinutes)}:${displaySeconds.toFixed(2).padStart(5, '0')}`;
};

const convertToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(':');
    return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
};

interface TimerProps {
    index: number;
    isRunning: boolean;
    callbackOnFinish: () => void;
}

const Timer = ({ index, isRunning, callbackOnFinish }: TimerProps) => {
    const timerStore = useTimerStore();
    const timer = useTimer(timerStore.timerList[index].seconds, () => {
        callbackOnFinish();
        timer.reset();
    });
    const [inputTimer, setInputTime] = useState('00:00:00');

    useEffect(() => {
        if (isRunning) {
            timer.start();
        } else {
            timer.stop();
            timer.reset();
        }
    }, [isRunning]);

    const handleTimeInput = (newTime: string) => {
        setInputTime(newTime);

        let seconds;
        if (newTime.length !== 8) {
            seconds = 0;
        } else {
            seconds = convertToSeconds(newTime);
        }
        timerStore.updateTimerSeconds(index, seconds);
    };

    return (
        <div className={clsx('flex w-fit flex-col gap-4 rounded-xl p-4 shadow-lg', isRunning ? 'bg-pink' : 'bg-cyan')}>
            <input
                type="time"
                step={1000}
                value={inputTimer}
                onChange={e => handleTimeInput(e.target.value)}
                className="rounded-lg px-2 py-1"
                disabled={isRunning}
            />
            <div className="text-center">{convertToClockFormat(timer.secondsLeft)}</div>
        </div>
    );
};

export default Timer;
