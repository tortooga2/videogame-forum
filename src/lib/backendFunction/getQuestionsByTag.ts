import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type QuestionModelWithCount = Prisma.QuestionGetPayload<{
    include: {
        poster: { select: { id: true; name: true; email: true } };
        tag: { select: { id: true; name: true; color: true } };
    };
    _count: {
        answers: true;
    };
}>;

export async function getQuestionsByTag(
    tagId: string
): Promise<QuestionModelWithCount[] | null> {
    if (!tagId) {
        console.error("Tag ID is required");
        return null;
    }
    const questions = await prisma.question.findMany({
        where: {
            tagid: tagId,
        },
        include: {
            poster: { select: { id: true, name: true, email: true } },
            tag: { select: { id: true, name: true, color: true } },
        },
    });

    return questions.map((p) => ({
        ...p,
        title: p.title ?? "",
        description: p.description ?? "",
    }));
}
