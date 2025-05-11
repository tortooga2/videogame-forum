"use client";
import { useEffect, useState } from "react";
import { handleVote, getVotes } from "@/lib/frontendFunctions/handleVote";

export default function VoteArea({
    postId,
    postType,
}: {
    postId: string;
    postType: string;
}) {
    const [counts, setCounts] = useState({ upvotes: 0, downvotes: 0 });
    const [hasVoted, setHasVoted] = useState("none");

    useEffect(() => {
        getVotes(postType, postId, setCounts, setHasVoted);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem",
            }}
        >
            <button
                style={{
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid white",
                    backgroundColor:
                        hasVoted === "upvote" ? "red" : "#ffffff00",
                }}
                onClick={async (e) => {
                    handleVote(
                        e,
                        "upvote",
                        postType,
                        postId,
                        setCounts,
                        setHasVoted
                    );
                }}
            >
                ^
            </button>
            {counts.upvotes - counts.downvotes} votes
            <button
                style={{
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid white",
                    transform: "rotate(180deg)",
                    backgroundColor:
                        hasVoted === "downvote" ? "blue" : "#ffffff00",
                }}
                onClick={async (e) => {
                    handleVote(
                        e,
                        "downvote",
                        postType,
                        postId,
                        setCounts,
                        setHasVoted
                    );
                }}
            >
                ^
            </button>
        </div>
    );
}
