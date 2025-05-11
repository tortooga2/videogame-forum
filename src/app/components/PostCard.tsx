// components/PostCard.tsx
"use client";

import VoteArea from "./voteArea";
import type { QuestionWithRelations } from "@/lib/backendFunction/getAllQuestion";

import Link from "next/link";


export default function PostCard({
    question,
}: {
    question: QuestionWithRelations;
}) {
    return (
        <div className="bg-[#1a1c2c] border border-gray-600 rounded-md p-4 flex flex-col gap-3 hover:shadow-md transition">
            <Link href={`/question/${question.id}`} className="space-y-1">
                <h2 className="text-lg font-semibold underline text-white">
                    {question.title}
                </h2>
                {question.tag && question.tag.id !== "0" && (
                    <p style={{ color: question.tag.color }}>
                        {question.tag.name}
                    </p>
                )}
                <p className="text-sm text-gray-300">
                    By: {question.poster.email.split("@")[0]}{" "}
                </p>
                <p className="text-sm text-gray-400">
                    Created at: {new Date(question.createdAt).toLocaleString()}
                </p>
                <p className="text-white">{question.description}</p>
            </Link>

            <div className="flex gap-4 items-center text-sm">
                <VoteArea postId={question.id} postType="question" />
            </div>
        </div>
    );
}
