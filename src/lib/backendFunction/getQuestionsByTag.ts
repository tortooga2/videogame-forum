import prisma from "@/lib/prisma";

import { QuestionWithRelations } from "./getAllQuestion";

export async function getQuestionsByTag(
    tagId: string
): Promise<QuestionWithRelations[] | null> {
    if (!tagId) {
        console.error("Tag ID is required");
        return null;
    }
    const posts = await prisma.question.findMany({
        where: {
            tagid: tagId,
        },
        orderBy: { createdAt: "desc" },
        include: {
            poster: { select: { id: true, name: true, email: true } },
            tag: { select: { id: true, name: true, color: true } },
            answers: true,
        },
    });

    if (!posts) {
        return null;
    }

    return posts.map((p) => ({
        ...p,
        title: p.title ?? "",
        description: p.description ?? "",
    })) as QuestionWithRelations[];
}
