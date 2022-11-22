import create from 'zustand';

interface Audio {
    audio: HTMLAudioElement | undefined;
    loadAudio: (newSrc: string) => void;
}

const useAudioStore = create<Audio>(set => ({
    audio: undefined,
    loadAudio: (newSrc: string) =>
        set(() => {
            return {
                audio: new Audio(newSrc),
            };
        }),
}));

export default useAudioStore;
