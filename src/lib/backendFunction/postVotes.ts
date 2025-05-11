import prisma from "@/lib/prisma";

export const hasVotedAnswer = async (answerId: string, userId: string) => {
    const hasVoted = await prisma.answerVote.findFirst({
        where: {
            answerId: answerId,
            userId: userId,
        },
    });

    if (!hasVoted?.vote) {
        return false;
    }

    return hasVoted.vote;
};

export const hasVotedQuestion = async (questionId: string, userId: string) => {
    const hasVoted = await prisma.questionVote.findFirst({
        where: {
            questionId: questionId,
            userId: userId,
        },
    });

    if (!hasVoted?.vote) {
        return false;
    }

    return hasVoted.vote;
};

export const getAnswerVoteCount = async (answerId: string) => {
    const upVoteCount = await prisma.answerVote.count({
        where: {
            answerId: answerId,
            vote: "upvote",
        },
    });

    const downVoteCount = await prisma.answerVote.count({
        where: {
            answerId: answerId,
            vote: "downvote",
        },
    });

    return { upVoteCount, downVoteCount };
};

export const getQuestionVoteCount = async (questionId: string) => {
    const question = await prisma.question.findFirst({
        where: {
            id: questionId,
        },
    });

    if (!question?.upvotes && !question?.downvotes) {
        return {
            upVoteCount: 0,
            downVoteCount: 0,
        };
    }

    return {
        upVoteCount: question.upvotes,
        downVoteCount: question.downvotes,
    };
};

export async function updateAnswerVote(
    answerId: string,
    userId: string,
    voteType: string
) {
    // Check if the user has already voted
    // If not, update the vote count
    // If yes, update the vote count and remove the previous vote
    let hasVoted;
    const vote = await prisma.answerVote.findFirst({
        where: {
            answerId: answerId,
            userId: userId,
        },
    });
    if (vote) {
        if (voteType == "none") {
            await prisma.answerVote.delete({
                where: {
                    id: vote.id,
                    userId: userId,
                },
            });
        } else {
            const newVote = await prisma.answerVote.update({
                where: {
                    id: vote.id,
                    userId: userId,
                },
                data: {
                    vote: voteType,
                },
            });
            hasVoted = newVote?.vote;
        }
    } else {
        if (voteType !== "none") {
            const newVote = await prisma.answerVote.create({
                data: {
                    userId: userId,
                    answerId: answerId,
                    vote: voteType,
                },
            });
            hasVoted = newVote?.vote;
        }
    }

    const { upVoteCount, downVoteCount } = await getAnswerVoteCount(answerId);

    return { upVoteCount, downVoteCount, ...(hasVoted ? { hasVoted } : {}) };
}

export async function updateQuestionVote(
    questionId: string,
    userId: string,
    voteType: string
) {
    // Check if the user has already voted
    // If not, update the vote count
    // If yes, update the vote count and remove the previous vote
    let hasVoted;

    const Question = await prisma.question.findUnique({
        where: {
            id: questionId,
        },
    });
    if (!Question) {
        return {
            message: "question not found",
            status: 404,
        };
    }

    const vote = await prisma.questionVote.findFirst({
        where: {
            questionId: questionId,
            userId: userId,
        },
    });
    if (vote) {
        if (voteType == "none") {
            await prisma.questionVote.delete({
                where: {
                    id: vote.id,
                    userId: userId,
                },
            });
            if (vote.vote === "upvote") {
                await prisma.question.update({
                    where: {
                        id: questionId,
                    },
                    data: {
                        upvotes: {
                            increment: -1,
                        },
                        updatedAt: new Date(),
                    },
                });
            } else if (vote.vote === "downvote") {
                await prisma.question.update({
                    where: {
                        id: questionId,
                    },
                    data: {
                        downvotes: {
                            increment: -1,
                        },
                        updatedAt: new Date(),
                    },
                });
            }
        } else {
            if (vote.vote === voteType) {
                return {
                    message: "already voted",
                    status: 200,
                };
            }
            const newVote = await prisma.questionVote.update({
                where: {
                    id: vote.id,
                    userId: userId,
                },
                data: {
                    vote: voteType,
                },
            });

            if (voteType === "upvote") {
                if (vote.vote === "downvote") {
                    await prisma.question.update({
                        where: {
                            id: questionId,
                        },
                        data: {
                            upvotes: {
                                increment: 1,
                            },
                            downvotes: {
                                increment: -1,
                            },
                            updatedAt: new Date(),
                        },
                    });
                }
            } else if (voteType === "downvote") {
                if (vote.vote === "upvote") {
                    await prisma.question.update({
                        where: {
                            id: questionId,
                        },
                        data: {
                            downvotes: {
                                increment: 1,
                            },
                            upvotes: {
                                increment: -1,
                            },

                            updatedAt: new Date(),
                        },
                    });
                }
            }

            hasVoted = newVote?.vote;
        }
    } else {
        if (voteType !== "none") {
            const newVote = await prisma.questionVote.create({
                data: {
                    questionId: questionId,
                    userId: userId,
                    vote: voteType,
                },
            });
            if (voteType === "upvote") {
                await prisma.question.update({
                    where: {
                        id: questionId,
                    },
                    data: {
                        upvotes: {
                            increment: 1,
                        },
                        updatedAt: new Date(),
                    },
                });
            } else if (voteType === "downvote") {
                await prisma.question.update({
                    where: {
                        id: questionId,
                    },
                    data: {
                        downvotes: {
                            increment: 1,
                        },
                        updatedAt: new Date(),
                    },
                });
            }
            hasVoted = newVote?.vote;
        }
    }

    const { upVoteCount, downVoteCount } = await getQuestionVoteCount(
        questionId
    );

    return { upVoteCount, downVoteCount, ...(hasVoted ? { hasVoted } : {}) };
}
