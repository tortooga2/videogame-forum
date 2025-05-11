"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "next-auth/react";
import ToggleTheme from "./ToggleTheme";

export default function Navbar({ user }: { user: string }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full dark:bg-[#1b1a2d] text-white px-6 py-4 shadow-md relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xl font-bold">🎮 Tilted Towers Talk</div>

                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full md:w-1/2 px-4 py-2 rounded-full border-2 border-cyan-400 focus:border-orange-400 bg-[#2a2942] text-white placeholder-gray-300 outline-none transition"
                />

                <div className="flex gap-4 items-center relative">
                    <ToggleTheme />

                    {/* User Avatar / Icon */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a2942] hover:bg-[#3a3955] transition"
                    >
                        <FaUserCircle className="text-2xl" />
                        <span className="hidden md:inline text-sm">{user.split("@")[0]}</span>
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute right-0 top-12 bg-gray-600 dark:bg-[#2a2942] text-white rounded shadow-md w-40">
                            <button
                                onClick={() => {
                                    if (confirm("Are you sure you want to sign out?")) {
                                        signOut();
                                    }
                                }}
                                className="w-full text-left px-4 py-1 hover:bg-red-400 transition"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
