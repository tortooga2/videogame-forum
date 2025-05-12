"use client";

import { useEffect, useState } from "react";
import { handleVote, getVotes } from "@/lib/frontendFunctions/handleVote";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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
    }, [postId, postType]);

    return (
        <div className="flex items-center gap-4 px-4 py-2 ">
            {/* Upvote */}
            <button
                onClick={(e) =>
                    handleVote(
                        e,
                        "upvote",
                        postType,
                        postId,
                        setCounts,
                        setHasVoted
                    )
                }
                className={`p-2 rounded-full border transition 
          ${
              hasVoted === "upvote"
                  ? "bg-lime-500 border-lime-500 "
                  : "border-gray-400 hover:bg-lime-600 hover:border-lime-600"
          }`}
                title="Upvote"
            >
                <FaArrowUp />
            </button>

            {/* Vote count */}
            <span className="font-semibold text-lg">
                {counts.upvotes - counts.downvotes} votes
            </span>

            {/* Downvote */}
            <button
                onClick={(e) =>
                    handleVote(
                        e,
                        "downvote",
                        postType,
                        postId,
                        setCounts,
                        setHasVoted
                    )
                }
                className={`p-2 rounded-full border transition 
          ${
              hasVoted === "downvote"
                  ? "bg-pink-500 border-pink-500"
                  : "border-gray-400 hover:bg-pink-600 hover:border-pink-600"
          }`}
                title="Downvote"
            >
                <FaArrowDown />
            </button>
        </div>
    );
}
