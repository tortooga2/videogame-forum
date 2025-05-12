"use client";

import VoteArea from "./voteArea";
import type { QuestionWithRelations } from "@/lib/backendFunction/getAllQuestion";
import { MdComment } from "react-icons/md";
import Link from "next/link";

export default function PostCard({
    question,
}: {
    question: QuestionWithRelations;
}) {
    return (
        <div
            className="border border-gray-600 rounded-md p-4 flex flex-col gap-3 hover:shadow-md transition"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
        >
            <Link href={`/question/${question.id}`} className="space-y-1">
                <h2 className="text-lg font-semibold underline">
                    {question.title}
                </h2>

                {question.tag && question.tag.id !== "0" && (
                    <p style={{ color: question.tag.color }}>
                        {question.tag.name}
                    </p>
                )}

                <p className="text-sm opacity-80">
                    By: {question.poster.email.split("@")[0]}
                </p>
                <p className="text-sm opacity-60">
                    Created at: {new Date(question.createdAt).toLocaleString()}
                </p>
                <p>{question.description}</p>
            </Link>

            <div className="flex gap-4 items-center text-sm opacity-80">
                <VoteArea postId={question.id} postType="question" />

                {question.answers && (
                    <div className="flex items-center gap-1 ml-2">
                        <MdComment className="text-lg" />
                        <span>
                            {question.answers.length}{" "}
                            {question.answers.length === 1 ? "reply" : "replies"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
