export default function Tabbar() {
    const tabs = [
        "Latest",
        "Unanswered",
        "Trending",
        "Popular this Week",
        "Popular this Month",
    ];

    return (
        <div className="w-full bg-[#0e0d22] px-4 py-3 overflow-x-auto border-b border-[#1a1c2c]">
            <div className="flex gap-4 md:gap-6 whitespace-nowrap text-sm sm:text-base">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className="text-[#f1f1f1] hover:text-[#00ffe7] hover:underline transition duration-150"
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}
