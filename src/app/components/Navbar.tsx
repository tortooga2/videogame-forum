"use client";

import { useState } from "react";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { SlGameController } from "react-icons/sl";

import { fuzzySearch } from "@/lib/frontendFunctions/fuzzySearch";
import TagTable from "@/app/components/TagTable";
import PostCard from "./PostCard";
import Answer from "./answer";
import { QuestionWithRelations } from "@/lib/backendFunction/getAllQuestion";
import { Answer as AnswerModel } from "@prisma/client";
import useTheme from "@/lib/frontendFunctions/useTheme";
export default function Navbar({ user }: { user: string }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const [searchResults, setSearchResults] = useState({
        tags: [],
        questions: [],
        answers: [],
    });
    const { theme, toggleTheme } = useTheme();
    const uniqueId = user?.split("@")[0] || "guest";

    const avatarUrl = `https://robohash.org/${uniqueId}.png?set=set3`;

    return (
        <nav className="w-full bg-[var(--bg-color)] text-[var(--text-color)] px-6 py-4 shadow-md relative z-10 border-b border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xl font-bold flex items-center gap-2">
                    <SlGameController /> Tilted Towers Talk
                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    onChange={async (e) => {
                        const query = e.target.value;
                        if (query) {
                            const data = await fuzzySearch(query);
                            console.log("Search results:", data);
                            setSearchResults(data);
                        }
                    }}
                    className="w-full md:w-1/2 px-4 py-2 rounded-full border-2 border-cyan-400 focus:border-orange-400   outline-none transition"
                    style={{
                        backgroundColor: "var(--card-bg)",
                        color: "var(--text-color)",
                    }}
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
                        style={{
                            backgroundColor: "var(--card-bg)",
                            color: "var(--text-color)",
                        }}
                    >
                        {!avatarUrl ? (
                            <FaUserCircle className="text-2xl" />
                        ) : (
                            <img
                                src={avatarUrl}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full object-cover"
                                onError={(e) => {
                                    (e.currentTarget.style.display = "none");
                                    // Optional: Add a fallback state if you want to render FaUserCircle in place
                                }}
                            />
                        )}
                        <span className="hidden md:inline text-sm">
                            {user.split("@")[0]}
                        </span>
                    </button>


                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div
                            className="absolute right-0 top-12  rounded shadow-md w-40"
                            style={{
                                backgroundColor: "var(--card-bg)",
                                color: "var(--text-color)",
                            }}
                        >
                            <button
                                onClick={() => {
                                    if (
                                        confirm(
                                            "Are you sure you want to sign out?"
                                        )
                                    ) {
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
            {(searchResults.tags.length !== 0 ||
                searchResults.questions.length !== 0 ||
                searchResults.answers.length !== 0) && (
                <div
                    className="border-orange-400"
                    style={{
                        position: "absolute",
                        top: "100%",
                        transform: "translateX(-50%)",
                        left: "50%",
                        backgroundColor: "#1b1a2d",
                        width: "60%",
                        height: "fit-content",
                        borderRadius: "1rem",
                        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <div className={"p-4"}>
                        <TagTable tags={searchResults.tags} />
                    </div>
                    <div className="flex flex-col gap-1 p-4">
                        {searchResults.questions.length > 0 && (
                            <h2 className="text-lg font-bold mb-3 items-center flex gap-0">
                                <span>Questions</span>
                            </h2>
                        )}
                        {(
                            searchResults.questions as QuestionWithRelations[]
                        ).map((q) => (
                            <PostCard key={q.id} question={q} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-1 p-4">
                        {searchResults.answers.length > 0 && (
                            <h2 className="text-lg font-bold mb-3 items-center flex gap-0">
                                <span>Answers</span>
                            </h2>
                        )}
                        {(searchResults.answers as AnswerModel[]).map((q) => (
                            <Answer key={q.id} answer={q} />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
