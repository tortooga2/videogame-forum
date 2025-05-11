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

    useEffect(() => {
        getVotes(postType, postId, setCounts);
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
                }}
                onClick={async (e) => {
                    handleVote(e, "upvote", postType, postId, setCounts);
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
                }}
                onClick={async (e) => {
                    handleVote(e, "downvote", postType, postId, setCounts);
                }}
            >
                ^
            </button>
        </div>
    );
}
