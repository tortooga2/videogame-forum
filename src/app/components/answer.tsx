"use client";

import { AnswerWithRelations } from "@/lib/backendFunction/getAnswersByQuestion";
import VoteArea from "./voteArea";

export default function Answer({ answer }: { answer: AnswerWithRelations }) {
    return (
        <div
            key={answer.id}
            className=" border border-gray-700 rounded-md p-5"
            style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
            }}
        >
            <div className="whitespace-pre-line">{answer.answer}</div>
            <div className="mt-4 text-sm flex justify-between items-center">
                <span>By: {answer.poster.email.split("@")[0]}</span>
                <span>{new Date(answer.createdAt).toLocaleString()}</span>
            </div>
            <VoteArea postId={answer.id} postType="answer" />
        </div>
    );
}
