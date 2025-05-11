import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

import {
    getAnswerVoteCount,
    getQuestionVoteCount,
    hasVotedAnswer,
    hasVotedQuestion,
    updateQuestionVote,
    updateAnswerVote,
} from "@/lib/backendFunction/postVotes";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
    const session = await auth();

    const userId = session?.user?.id;

    const searchParams = req.nextUrl.searchParams;
    const postId = searchParams.get("postId");
    const postType = searchParams.get("postType");

    if (!(postId && postType)) {
        return NextResponse.json(
            { message: "missing search parameters" },
            { status: 200 }
        );
    }

    if (postType === "question") {
        const { upVoteCount, downVoteCount } = await getQuestionVoteCount(
            postId
        );
        let hasVoted;
        if (userId) {
            hasVoted = await hasVotedQuestion(postId, userId);
        }

        return NextResponse.json(
            {
                hasVoted: hasVoted,
                upvotes: upVoteCount,
                downvotes: downVoteCount,
            },
            { status: 200 }
        );
    }

    if (postType === "answer") {
        const { upVoteCount, downVoteCount } = await getAnswerVoteCount(postId);
        let hasVoted;
        if (userId) {
            hasVoted = await hasVotedAnswer(postId, userId);
        }
        return NextResponse.json(
            {
                hasVoted: hasVoted,
                upvotes: upVoteCount,
                downvotes: downVoteCount,
            },
            { status: 200 }
        );
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        redirect("/sign-in");
    }

    const searchParams = req.nextUrl.searchParams;
    const postId = searchParams.get("postId");
    const postType = searchParams.get("postType");
    const voteType = searchParams.get("voteType");

    if (!(postId && postType && voteType)) {
        return NextResponse.json(
            { message: "missing search params" },
            { status: 200 }
        );
    }

    const userId = session.user?.id;
    if (!userId) {
        return NextResponse.json(
            {
                message: "failed to find user id",
            },
            { status: 200 }
        );
    }

    if (postType === "question") {
        const { upVoteCount, downVoteCount, hasVoted } =
            await updateQuestionVote(postId, userId, voteType);
        console.log(
            "upVoteCount: ",
            upVoteCount,
            "downVoteCount: ",
            downVoteCount,
            "hasVoted: ",
            hasVoted
        );

        if (!(upVoteCount || downVoteCount || hasVoted)) {
            return NextResponse.json(
                {
                    message: "failed to update vote",
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { hasVoted, upVoteCount, downVoteCount },
            { status: 200 }
        );
    }

    if (postType === "answer") {
        const { upVoteCount, downVoteCount, hasVoted } = await updateAnswerVote(
            postId,
            userId,
            voteType
        );

        return NextResponse.json({ hasVoted, upVoteCount, downVoteCount });
    }
}
