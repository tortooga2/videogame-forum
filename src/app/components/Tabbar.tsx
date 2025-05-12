"use client";

import { useState } from "react";

export default function Tabbar({ onTabChange }: { onTabChange: (tab: string) => void }) {
    const tabs = ["Latest", "Unanswered", "Trending", "Popular this Week", "Popular this Month"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const getUnderlineColor = (tab: string) => {
        if (tab.includes("Latest")) return "border-cyan-400";
        if (tab.includes("Trending")) return "border-[#bf5af2]";
        return "border-[#ff4ecd]";
    };

    return (
        <div className="w-full  bg-[#0e0d22] box-border rounded-md px-4 py-3 overflow-x-auto border-b border-2 border-gray-600 shadow-inner">
            <div className="flex gap-4 md:gap-6 whitespace-nowrap text-sm sm:text-base ">
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
                            className={`pb-1 px-2 font-semibold border-b-2  transition duration-200 ${isActive
                                    ? `text-white ${underlineColor}`
                                    : "border-transparent text-gray-300 hover:text-[#ff4ecd]"
                                }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
