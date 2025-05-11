import { Dispatch, SetStateAction } from "react";

export const handleVote = async (
    e: React.MouseEvent,
    voteType: string,
    postType: string,
    postId: string,
    setCounts: Dispatch<
        SetStateAction<{
            upvotes: number;
            downvotes: number;
        }>
    >,
    setHasVote: Dispatch<SetStateAction<string>>
) => {
    e.stopPropagation();
    const response = await fetch(
        `/api/vote/count/?postId=${encodeURIComponent(
            postId
        )}&postType=${encodeURIComponent(postType)}&voteType=${voteType}`,
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
        setHasVote(data.hasVoted);
    }
};

export const getVotes = async (
    postType: string,
    postId: string,
    setCounts: Dispatch<
        SetStateAction<{
            upvotes: number;
            downvotes: number;
        }>
    >,
    setHasVote: Dispatch<SetStateAction<string>>
) => {
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
        setHasVote(data.hasVoted);
    }
};
