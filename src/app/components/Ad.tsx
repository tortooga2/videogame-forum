"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function AdBlock() {
    const [hidden, setHidden] = useState(false);

    if (hidden) return null;

    return (
        <div className="relative bg-[#1a1c2c] text-white p-4 rounded-md shadow-md border border-gray-700">
  
            <button
                onClick={() => setHidden(true)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition"
                aria-label="Close ad"
            >
                <IoClose size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-2">Sponsored</h3>
            <Link href="https://nintendo.com/switch-2" target="_blank">
                <div className="space-y-2 hover:bg-[#2a2d45] p-2 rounded-md transition">
                    <Image
                        src="/ads/switch2.jpg"
                        alt="Nintendo Switch 2"
                        width={400}
                        height={300}
                        className="w-full h-48 bg-center object-cover rounded"
                    />
                    <p className="text-sm">
                        Nintendo Switch 2 is coming — faster, sharper, and more immersive.
                    </p>
                    <p className="text-sm text-gray-300">
                        Pre-orders open soon. Don’t miss the next generation of portable play.
                    </p>
                    <button className="text-cyan-400 hover:underline text-sm font-medium">
                        Learn More →
                    </button>
                </div>
            </Link>
        </div>
    );
}
