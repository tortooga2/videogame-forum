"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import Tabbar from "./Tabbar";

type Post = {
    id: string;
    userId: string;
    title: string;
    description: string;
    createdAt: string;
    upvotes?: number;
    downvotes?: number;
};

export default function PostFeed({ questions }: { questions: Post[] }) {
    const [activeTab, setActiveTab] = useState("Latest");

    const sortedQuestions = [...questions];

    if (activeTab === "Popular this Week") {
        sortedQuestions.sort((a, b) => {
            const aVotes = (a.upvotes ?? 0) - (a.downvotes ?? 0);
            const bVotes = (b.upvotes ?? 0) - (b.downvotes ?? 0);
            return bVotes - aVotes;
        });
    }

    return (
        <>
            <Tabbar onTabChange={setActiveTab} />
            <h1 className="text-2xl font-bold text-white">Posts</h1>
            <div className="flex flex-col gap-4">
                {sortedQuestions.map((q) => (
                    <PostCard
                        key={q.id}
                        id={q.id}
                        userId={q.userId}
                        title={q.title}
                        description={q.description}
                        createdAt={q.createdAt}
                    />
                ))}
            </div>
        </>
    );
}
