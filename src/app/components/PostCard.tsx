// components/PostCard.tsx
"use client";
import VoteArea from "./voteArea";

import Link from "next/link";

type PostCardProps = {
    id: string;
    userId: string;
    title: string;
    description: string;
    createdAt: string | Date;
    // upvotes: number;
    // downvotes: number;
};

export default function PostCard({
    id,
    userId,
    title,
    description,
    createdAt,
    // upvotes,
    // downvotes,
}: PostCardProps) {
    return (
        <div className="bg-[#1a1c2c] border border-gray-600 rounded-md p-4 flex flex-col gap-3 hover:shadow-md transition">
            <Link href={`/question/${id}`} className="space-y-1">
                <h2 className="text-lg font-semibold underline text-white">
                    {title}
                </h2>
                <p className="text-sm text-gray-300">By: {userId}</p>
                <p className="text-sm text-gray-400">
                    Created at: {new Date(createdAt).toLocaleString()}
                </p>
                <p className="text-white">{description}</p>
            </Link>

            <div className="flex gap-4 items-center text-sm">
                <VoteArea postId={id} postType="question" />
            </div>
        </div>
    );
}
