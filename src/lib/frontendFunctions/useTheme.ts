// useTheme.ts (hook)
import { useEffect, useState } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const newTheme = stored || (prefersDark ? "dark" : "light");
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
    };

    return { theme, toggleTheme };
}
