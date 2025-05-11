"use client";

export default function Tabbar({ onTabChange }: { onTabChange: (tab: string) => void }) {
    const tabs = ["Latest", "Unanswered", "Trending", "Popular this Week", "Popular this Month"];

    return (
        <div className="w-full bg-[#0e0d22] px-4 py-3 overflow-x-auto border-b border-[#1a1c2c]">
            <div className="flex gap-4 md:gap-6 whitespace-nowrap text-sm sm:text-base">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className="text-[#f1f1f1] border-b-4 border-transparent hover:border-cyan-600 transition duration-200 pb-1"
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}
