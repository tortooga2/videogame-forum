import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type AnswerWithRelations = Prisma.AnswerGetPayload<{
    include: {
        poster: { select: { id: true; name: true; email: true } };
        tag: { select: { id: true; name: true; color: true } };
        answers: true;
    };
}>;

export async function getAnswersByQuestion(
    questionId: string
): Promise<AnswerWithRelations[] | null> {
    const answers = await prisma.answer.findMany({
        where: {
            questionId: questionId,
        },
        include: {
            poster: { select: { id: true, name: true, email: true } },
        },
    });

    console.log("answers", answers);

    if (!answers) {
        return null;
    }

    return answers.map((a) => ({
        ...a,
        answer: a.answer ?? "",
    })) as AnswerWithRelations[];
}
