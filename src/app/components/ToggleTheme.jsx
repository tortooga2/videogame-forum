"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ToggleTheme() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const prefersDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
        setIsDark(prefersDark);
        document.documentElement.classList.toggle("dark", prefersDark); // ← change here
    }, []);

    const toggleTheme = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        document.documentElement.classList.toggle("dark", newMode); // ← change here
        localStorage.setItem("theme", newMode ? "dark" : "light");
    };

    return (
        <button onClick={toggleTheme} className="text-xl ml-2">
            {isDark ? <FaSun /> : <FaMoon />}
        </button>
    );
}
