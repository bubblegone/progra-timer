import { ButtonPrimary, ButtonSecondary } from './components/Button';
import { useEffect } from 'react';
import TimerList from './components/TimerList';
import { useTimerStore } from './store/timerStore';
import useAudioStore from './store/audioStore';
import Loading from './components/Loading';
import { NewFileIcon, PlusIcon } from './components/Icons';

const AudioUploadButton = () => {
    const audioStore = useAudioStore();

    const processFileUpload = async (file: File | null | undefined) => {
        if (!file) {
            return;
        }
        const url = URL.createObjectURL(file);
        audioStore.loadAudio(url);
    };

    return (
        <div>
            <label
                htmlFor="notification-file-input"
                className="flex cursor-pointer justify-center gap-2 rounded-lg border border-off-black bg-purple py-1.5 px-4 text-center font-medium text-off-black shadow-lg"
            >
                <span>Load audio</span>
                <NewFileIcon className="box-border py-0.5 text-off-black"></NewFileIcon>
            </label>
            <input
                id="notification-file-input"
                type={'file'}
                onChange={e => processFileUpload(e.target.files?.item(0))}
                accept=".mp3,.wav"
                className="hidden"
            ></input>
        </div>
    );
};

const TimerControls = () => {
    const timerStore = useTimerStore();
    const audio = useAudioStore(state => state.audio);

    const startTimers = () => {
        timerStore.reset();
        timerStore.moveToNextTimer();
        timerStore.setRunningForCurrent(true);
    };

    const stopTimers = () => {
        timerStore.setRunningForCurrent(false);
        timerStore.reset();
        if (audio !== undefined) {
            audio.pause();
            audio.currentTime = 0;
        }
    };

    return (
        <div className="mx-auto grid w-fit grid-cols-2 gap-4">
            <ButtonPrimary onClick={startTimers} disabled={timerStore.isAnyRunning}>
                Start
            </ButtonPrimary>
            <ButtonSecondary onClick={stopTimers}>Stop</ButtonSecondary>
        </div>
    );
};

function App() {
    const timerStore = useTimerStore();
    const audioStore = useAudioStore();
    const audio = useAudioStore(state => state.audio);

    useEffect(() => {
        audioStore.loadAudio('/default-notification.wav');
    }, []);

    useEffect(() => {
        if (audio !== undefined) {
            audio.onended = async () => {
                timerStore.setRunningForCurrent(false);
                timerStore.moveToNextTimer();
                timerStore.setRunningForCurrent(true);
            };
        }
    }, [audio]);

    return (
        <>
            <header className="my-12">
                <h1 className="text-center text-4xl font-medium">Chain timer</h1>
            </header>
            <main className="m-app-container flex grow flex-col gap-8 pb-8">
                <div className="mx-auto grid w-fit grid-cols-2 gap-4">
                    <ButtonPrimary onClick={timerStore.addTimer} className="flex items-center justify-center gap-2">
                        <span>Add timer</span>
                        <PlusIcon className="box-border block py-0.5 text-white"></PlusIcon>
                    </ButtonPrimary>
                    <AudioUploadButton></AudioUploadButton>
                </div>
                {audio === undefined ? (
                    <Loading></Loading>
                ) : (
                    <TimerList callbackOnFinish={() => audio.play()}></TimerList>
                )}
                <TimerControls></TimerControls>
            </main>
        </>
    );
}

export default App;
