"use client"; // ← add this

import { useTheme } from "@/lib/theme-context";
import { FaMoon, FaSun } from "react-icons/fa";
import ToggleTheme from "./ToggleTheme";

export default function Navbar({ user }: { user: string }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <nav className="w-full bg-[#1b1a2d] text-white px-6 py-4 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xl font-bold text-white">🎮 GameForum</div>

                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full md:w-1/2 px-4 py-2 rounded-full border-2 border-cyan-400 focus:border-orange-400 bg-[#2a2942] text-white placeholder-gray-300 outline-none transition"
                />

                <div className="flex gap-4 items-center">
                    <ToggleTheme />
                    <button>{user}</button>
                </div>
            </div>
        </nav>
    );
}
