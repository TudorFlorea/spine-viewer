import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface SettingsStore {
    theme: string;
    showStats: boolean;
    canvasBackground: string;
}

export interface SettingsStoreActions {
    setTheme: (theme: string) => void;
    setShowStats: (showStats: boolean) => void;
    setCanvasBackground: (canvasBackground: string) => void;
}

export const useSettingsStore = create<SettingsStore & SettingsStoreActions>()(
    devtools(
        persist((set) => ({
            theme: "dark",
            showStats: false,
            canvasBackground: "#e4eaf0",
            setTheme: (theme) => set((_) => ({ theme })),
            setShowStats: (showStats) => set((_) => ({showStats})),
            setCanvasBackground: (canvasBackground) => set((_) => ({ canvasBackground })),
        }), { name: "settings" })
    )
);