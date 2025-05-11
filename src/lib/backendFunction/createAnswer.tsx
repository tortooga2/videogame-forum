import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function createAnswer(
    formData: FormData,
    questionId: string
) {
    const content = formData.get("content");
    if (!content) {
        return null;
    }
    if (typeof content !== "string") {
        return null;
    }

    const session = await auth();
    if (!session) {
        return null;
    }
    const userId = session.user?.id;
    if (!userId) {
        return null;
    }
    const post = await prisma.answer.create({
        data: {
            userId: userId,
            questionId: questionId,
            answer: content,
        },
    });

    if (!post) {
        return null;
    }
    return post;
}
