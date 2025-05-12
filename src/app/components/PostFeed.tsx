"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import Tabbar from "./Tabbar";
import { QuestionWithRelations } from "@/lib/backendFunction/getAllQuestion";

export default function PostFeed({
    questions,
}: {
    questions: QuestionWithRelations[];
}) {
    const [activeTab, setActiveTab] = useState("Latest");

    const sortedQuestions = [...questions] as QuestionWithRelations[];

    if (activeTab === "Popular this Week") {
        sortedQuestions.sort((a, b) => {
            const aVotes = (a.upvotes ?? 0) - (a.downvotes ?? 0);
            const bVotes = (b.upvotes ?? 0) - (b.downvotes ?? 0);
            return bVotes - aVotes;
        });
    }

    if (activeTab === "Unanswered") {
        sortedQuestions.sort((a, b) => {
            const aAnswers = a.answers?.length ?? 0;
            const bAnswers = b.answers?.length ?? 0;
            return aAnswers - bAnswers;
        });
    }

    return (
        <>
            <Tabbar onTabChange={setActiveTab} />
            <h1 className="text-2xl font-bold text-white">Posts</h1>
            <div className="flex flex-col gap-4">
                {sortedQuestions.map((q) => (
                    <PostCard key={q.id} question={q} />
                ))}
            </div>
        </>
    );
}
