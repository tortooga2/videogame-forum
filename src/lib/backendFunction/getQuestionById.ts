import prisma from "@/lib/prisma";

export const getQuestionById = async (questionId: string) => {
    const question = await prisma.question.findFirst({
        where: {
            id: questionId,
        },
    });

    if (!question) {
        return null;
    }

    return question;
};
