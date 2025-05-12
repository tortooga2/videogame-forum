"use client";

import Link from "next/link";
import { FaUserTag } from "react-icons/fa";

type Tag = {
    id: string;
    name: string;
    color: string;
};

export default function TagTable({ tags }: { tags: Tag[] }) {
    const visibleTags = tags.filter(tag => tag.name.toLowerCase() !== "none");

    return (
        <div className="bg-[#1a1c2c] text-white p-4 rounded-md shadow-md border border-gray-700">
            <h2 className="text-lg font-bold mb-3 flex gap-2 items-center"><span><FaUserTag className="text-yellow-400" /></span>All Tags</h2>
            <div className="flex flex-wrap gap-2">
                {visibleTags.map((tag) => (
                    <Link
                        key={tag.id}
                        href={`/tag/${tag.id}`}
                        className="px-3 py-1 text-sm rounded-full font-medium transition hover:opacity-90"
                        style={{ backgroundColor: tag.color }}
                    >
                        {tag.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
