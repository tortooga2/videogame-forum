"use client";
import { useEffect, useState } from "react";

export default function VoteArea({
    postId,
    postType,
}: {
    postId: string;
    postType: string;
}) {
    const [counts, setCounts] = useState({ upvotes: 0, downvotes: 0 });

    const getVotes = async () => {
        const response = await fetch(
            `/api/vote/count?postType=${encodeURIComponent(
                postType
            )}&postId=${encodeURIComponent(postId)}`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        if (response.ok) {
            setCounts({
                upvotes: data.upvotes,
                downvotes: data.downvotes,
            });
        }
    };

    useEffect(() => {
        getVotes();
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
                    e.stopPropagation();
                    const response = await fetch(
                        `/api/vote/count/?postId=${encodeURIComponent(
                            postId
                        )}&postType=${encodeURIComponent(
                            "question"
                        )}&voteType=upvote`,
                        {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        setCounts({
                            upvotes: data.upVoteCount,
                            downvotes: data.downVoteCount,
                        });
                    }
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
                    e.stopPropagation();
                    const response = await fetch(
                        `/api/vote/count/?postId=${encodeURIComponent(
                            postId
                        )}&postType=${encodeURIComponent(
                            "question"
                        )}&voteType=downvote`,
                        {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        setCounts({
                            upvotes: data.upVoteCount,
                            downvotes: data.downVoteCount,
                        });
                    }
                }}
            >
                ^
            </button>
        </div>
    );
}
