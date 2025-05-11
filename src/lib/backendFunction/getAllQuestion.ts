import prisma from "@/lib/prisma";

export default async function getAllQuestions() {
    const posts = await prisma.question.findMany({
        include: {
            _count: {
                select: { answers: true },
            },
        },
        orderBy: {
            createdAt: "desc", // optional, but usually useful
        },
    });

    return posts;
}
