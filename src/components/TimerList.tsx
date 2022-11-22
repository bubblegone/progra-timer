import { useEffect } from 'react';
import { useTimerStore } from '../store/timerStore';
import Timer from './Timer';

interface TimerListProps {
    callbackOnFinish: () => void;
}

const TimerList = ({ callbackOnFinish }: TimerListProps) => {
    const timerStore = useTimerStore();

    useEffect(() => {
        timerStore.addTimer();

        return () => timerStore.removeTimer(0);
    }, []);

    return (
        <>
            <div className="mx-auto flex w-fit flex-wrap justify-center gap-4">
                {timerStore.timerList.map(timer => (
                    <Timer
                        key={timer.index}
                        index={timer.index}
                        callbackOnFinish={callbackOnFinish}
                        isRunning={timer.isRunning}
                    ></Timer>
                ))}
            </div>
        </>
    );
};

export default TimerList;
