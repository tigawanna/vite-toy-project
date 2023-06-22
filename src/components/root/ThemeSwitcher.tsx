import { useEffect, useState } from "react";
import { Theme } from "./types";
import { SunIcon, MoonIcon } from "lucide-react";
import jscookie from "js-cookie"
interface ThemeSwitcherProps {
    theme: Theme|undefined
}

export function ThemeSwitcher({theme}:ThemeSwitcherProps){
    const [_theme, setTheme] = useState<Theme | undefined>(theme)    
    useEffect(() => {
        const colorTheme = theme === 'dark' ? 'light' : 'dark';
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        if (theme) {
            root.classList.add(theme);
            jscookie.set("theme", theme)
            setTheme(theme);
            // localStorage.setItem('theme', theme);
        }
    }, [theme]);
    const nextTheme = theme === "dark" ? "light" : "dark";
    const ModeIcon = theme === "dark" ? SunIcon : MoonIcon;
    const toggleTheme = () => { setTheme(nextTheme) };
return (
    <button onClick={toggleTheme}>
        {
            _theme === "dark" ?
                <SunIcon className="h-8 w-8 text-yellow-500" />
                :
                <MoonIcon className="h-8 w-8" />
        }
    </button>
);
}
