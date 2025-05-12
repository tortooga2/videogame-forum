"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import Tabbar from "./Tabbar";
import { QuestionWithRelations } from "@/lib/backendFunction/getAllQuestion";

type Tag = {
    id: string;
    name: string;
};

export default function PostFeed({
    questions,
    tags,
}: {
    questions: QuestionWithRelations[];
    tags: Tag[];
}) {
    const [activeTab, setActiveTab] = useState("Latest");
    const [selectedTag, setSelectedTag] = useState<string>("");

    let filteredQuestions = [...questions];

    if (selectedTag) {
        filteredQuestions = filteredQuestions.filter(
            (q) => q.tag?.id === selectedTag
        );
    }

    if (activeTab === "Popular this Week") {
        filteredQuestions.sort((a, b) => {
            const aVotes = (a.upvotes ?? 0) - (a.downvotes ?? 0);
            const bVotes = (b.upvotes ?? 0) - (b.downvotes ?? 0);
            return bVotes - aVotes;
        });
    }

    if (activeTab === "Unanswered") {
        filteredQuestions.sort((a, b) => {
            const aAnswers = a.answers?.length ?? 0;
            const bAnswers = b.answers?.length ?? 0;
            return aAnswers - bAnswers;
        });
    }

    if (activeTab === "Trending") {
        filteredQuestions.sort((a, b) => {
            const aReplies = a.answers?.length ?? 0;
            const bReplies = b.answers?.length ?? 0;
            return bReplies - aReplies;
        });
    }

    return (
        <>
            <div className="flex items-center justify-between mb-2">
                <Tabbar onTabChange={setActiveTab} onTagChange={setSelectedTag} tags={tags} />
            </div>

            <h1 className="text-2xl font-bold mt-8">Posts</h1>
            <div className="flex flex-col gap-4">
                {filteredQuestions.map((q) => (
                    <PostCard key={q.id} question={q} />
                ))}
            </div>
        </>
    );
}
