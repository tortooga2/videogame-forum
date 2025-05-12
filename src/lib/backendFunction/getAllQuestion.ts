import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export type QuestionWithRelations = Prisma.QuestionGetPayload<{
    include: {
        poster: { select: { id: true; name: true; email: true } };
        tag: { select: { id: true; name: true; color: true } };
        answers: true,
    };
}>;

export async function getPosts(): Promise<QuestionWithRelations[] | null> {
    const posts = await prisma.question.findMany({
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
