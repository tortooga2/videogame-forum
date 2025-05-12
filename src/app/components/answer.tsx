"use client";

import VoteArea from "./voteArea";

import { Answer as AnswerModel } from "@prisma/client";

export default function Answer({ answer }: { answer: AnswerModel }) {
    return (
        <div>
            <p>{answer.userId}</p>
            <p>{answer.createdAt.toString()}</p>
            <p>{answer.answer}</p>
            <VoteArea postId={answer.id} postType={"answer"} />
        </div>
    );
}
