import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface SettingsStore {
    theme: string;
    canvasBackground: string;
}

export interface SettingsStoreActions {
    setTheme: (theme: string) => void;
    setCanvasBackground: (canvasBackground: string) => void;
}

export const useSettingsStore = create<SettingsStore & SettingsStoreActions>()(
    devtools(
        persist((set) => ({
            theme: "dark",
            canvasBackground: "#e4eaf0",
            setTheme: (theme) => set((_) => ({ theme })),
            setCanvasBackground: (canvasBackground) => set((_) => ({ canvasBackground })),
        }), { name: "settings" })
    )
);