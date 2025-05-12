"use client";

import { useState } from "react";

type TabbarProps = {
    onTabChange: (tab: string) => void;
    onTagChange: (tagId: string) => void;
    tags: { id: string; name: string }[];
};

export default function Tabbar({ onTabChange, onTagChange, tags }: TabbarProps) {
    const tabs = ["Latest", "Unanswered", "Trending", "Popular this Week"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const getUnderlineColor = (tab: string) => {
        if (tab.includes("Latest")) return "border-cyan-400";
        if (tab.includes("Trending")) return "border-[#bf5af2]";
        return "border-[#ff4ecd]";
    };

    return (
        <div className="w-full box-border rounded-md px-4 py-3 overflow-x-auto border-b border-2 border-gray-600 shadow-inner flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
            <div className="flex gap-4 md:gap-6 whitespace-nowrap text-sm sm:text-base">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    const underlineColor = getUnderlineColor(tab);

                    return (
                        <button
                            key={tab}
                            onClick={() => {
                                onTabChange(tab);
                                setActiveTab(tab);
                            }}
                            className={`pb-1 px-2 font-semibold border-b-2 transition duration-200 ${isActive
                                ? ` ${underlineColor}`
                                : "border-transparent  hover:text-[#ff4ecd]"
                                }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* Tag Filter Dropdown */}
            <select
                onChange={(e) => onTagChange(e.target.value)}
                className=" border border-gray-600 rounded px-3 py-1 text-sm"
                style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
            >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
