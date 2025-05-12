import prisma from "@/lib/prisma";
import { QuestionWithRelations } from "./getAllQuestion";

export const getQuestionById = async (
    questionId: string
): Promise<QuestionWithRelations | null> => {
    const post = await prisma.question.findFirst({
        where: { id: questionId },
        include: {
            poster: { select: { id: true, name: true, email: true } },
            tag: { select: { id: true, name: true, color: true } },
            answers: {
                select: {
                    id: true,
                    answer: true,
                    userId: true,
                    questionId: true,
                    createdAt: true,
                    updatedAt: true,
                    upvotes: true,
                    downvotes: true,
                },
            },
        },
    });


    if (!post) {
        return null;
    }

    return {
        ...post,
        title: post.title ?? "",
        description: post.description ?? "",
    };
};
