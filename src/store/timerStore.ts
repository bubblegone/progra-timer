import create from 'zustand';

type StoredTimer = { index: number; seconds: number; isRunning: boolean };

interface TimerStoreState {
    timerList: StoredTimer[];
    currentTimerIndex: number;
    addTimer: () => void;
    removeTimer: (index: number) => void;
    updateTimerSeconds: (index: number, seconds: number) => void;
    setRunningForCurrent: (isRunning: boolean) => void;
    moveToNextTimer: () => void;
    reset: () => void;
    isAnyRunning: boolean;
}

const getNextNonZeroTimerIndex = (state: TimerStoreState) => {
    let nextIndex = state.currentTimerIndex + 1;

    while (true) {
        const nextTimer = state.timerList.find(timer => timer.index === nextIndex);

        if (nextTimer === undefined) {
            return -1;
        }
        if (nextTimer.seconds !== 0) {
            return nextIndex;
        }
        nextIndex++;
    }
};

export const useTimerStore = create<TimerStoreState>(set => ({
    timerList: [],
    currentTimerIndex: -1,
    isAnyRunning: false,
    addTimer: () =>
        set(state => {
            return {
                timerList: [...state.timerList, { index: state.timerList.length, seconds: 0, isRunning: false }],
            };
        }),
    removeTimer: index =>
        set(state => ({
            timerList: state.timerList.filter(timer => timer.index != index),
        })),
    updateTimerSeconds: (index, seconds) =>
        set(state => ({
            timerList: state.timerList.map(timer =>
                timer.index === index
                    ? {
                          ...timer,
                          seconds: seconds,
                      }
                    : timer
            ),
        })),
    setRunningForCurrent: isRunning =>
        set(state => {
            if (state.currentTimerIndex === -1) {
                return {};
            }

            const newTimerList = state.timerList.map(timer =>
                timer.index === state.currentTimerIndex
                    ? {
                          ...timer,
                          isRunning: isRunning,
                      }
                    : timer
            );

            return {
                isAnyRunning: newTimerList.find(timer => timer.isRunning) !== undefined,
                timerList: newTimerList,
            };
        }),
    moveToNextTimer: () => set(state => ({ currentTimerIndex: getNextNonZeroTimerIndex(state) })),
    reset: () =>
        set(state => ({
            timerList: state.timerList.map(timer => ({ ...timer, isRunning: false })),
            currentTimerIndex: -1,
        })),
}));
