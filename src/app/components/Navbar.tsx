"use client";

import { useState } from "react";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { SlGameController } from "react-icons/sl";
import useTheme from "@/lib/frontendFunctions/useTheme";
export default function Navbar({ user }: { user: string }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="w-full bg-[var(--bg-color)] text-[var(--text-color)] px-6 py-4 shadow-md relative z-10 border-b border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xl font-bold flex items-center gap-2"><SlGameController /> Tilted Towers Talk</div>

                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full md:w-1/2 px-4 py-2 rounded-full border-2 border-cyan-400 focus:border-orange-400   outline-none transition"
                    style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
                />

                

                <div className="flex gap-4 items-center relative">
            
                        {/* Toggle Theme Button */}
                        <button onClick={toggleTheme} className="text-xl">
                            {theme === "dark" ? <FaSun /> : <FaMoon />}
                        </button>

                    {/* User Avatar / Icon */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-[#3a3955] transition"
                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
                    >
                        <FaUserCircle className="text-2xl" />
                        <span className="hidden md:inline text-sm">{user.split("@")[0]}</span>
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute right-0 top-12  rounded shadow-md w-40" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
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
