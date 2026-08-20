import { create } from 'zustand';

type AppState = {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    isHeroVideoReady: boolean;
    setHeroVideoReady: (ready: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
    activeIndex: 0,
    setActiveIndex: (idx) => set({ activeIndex: idx }),
    isHeroVideoReady: false,
    setHeroVideoReady: (ready) => set({ isHeroVideoReady: ready }),
}));
