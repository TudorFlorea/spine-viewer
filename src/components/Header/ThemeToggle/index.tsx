import { useEffect } from "react";
import { useSettingsStore } from "../../../store";
import "./ThemeToggle.css";

const ThemeToggle: React.FC = () => {

    const [theme, setTheme] = useSettingsStore(store => [store.theme, store.setTheme]);

    const themeClass = theme === "dark" ? "theme-toggle__ball--dark" : "theme-toggle__ball--light";

    const handleOnClick = () => {
        setTheme(theme === "dark"? "light" : "dark");
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <div onClick={handleOnClick} className="theme-toggle">
            <div className={`theme-toggle__ball ${themeClass}`}></div>
            <img src="/assets/images/dark-mode.png" />
            <img src="/assets/images/light-mode.png" />
        </div>
    )
};

export default ThemeToggle;