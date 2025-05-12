"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const ads = [
    {
        title: "Nintendo Switch 2",
        desc: "Faster, sharper, more immersive.",
        sub: "Pre-orders open soon. Don’t miss the next generation.",
        link: "https://nintendo.com/switch-2",
        image: "/ads/switch2.jpg",
    },
    {
        title: "Steam Deck OLED",
        desc: "The best way to play on the go.",
        sub: "Nun better than this shi, u better get it.",
        link: "https://store.steampowered.com/steamdeck",
        image: "/ads/steamdeck.webp",
    },
    {
        title: "Game Pass Ultimate",
        desc: "Play hundreds of games across console and PC.",
        sub: "Your gaming library, always expanding.",
        link: "https://xbox.com/game-pass",
        image: "/ads/gamepass.jpg",
    },
];

export default function AdBlock() {
    const [hidden, setHidden] = useState(false);
    const [currentAd, setCurrentAd] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentAd((prev) => (prev + 1) % ads.length);
                setFade(true);
            }, 300); // timing matches transition
        }, 6000); // change ad every 6 seconds
        return () => clearInterval(interval);
    }, []);

    if (hidden) return null;

    const ad = ads[currentAd];

    return (
        <div className="relative p-4 rounded-md shadow-md border border-gray-700 overflow-hidden" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
            <button
                onClick={() => setHidden(true)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition"
                aria-label="Close ad"
            >
                <IoClose size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-2">Sponsored</h3>
            <Link href={ad.link} target="_blank">
                <div
                    className={`transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"} space-y-2 hover:bg-[#2a2d45] p-2 rounded-md`}
                >
                    <Image
                        src={ad.image}
                        alt={ad.title}
                        width={400}
                        height={300}
                        className="w-full h-52 object-cover bg-no-repeat object-center rounded"
                    />
                    <p className="text-md font-bold">{ad.title}</p>
                    <p className="text-sm">{ad.desc}</p>
                    <p className="text-sm text-gray-500">{ad.sub}</p>
                    <button className="text-cyan-400 hover:underline text-sm font-medium">
                        Learn More →
                    </button>
                </div>
            </Link>
        </div>
    );
}
