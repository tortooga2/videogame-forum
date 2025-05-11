import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function createPost(formData: FormData) {
    const title = formData.get("title");
    const content = formData.get("content");
    if (!title || !content) {
        return null;
    }
    if (typeof title !== "string" || typeof content !== "string") {
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
    const post = await prisma.question.create({
        data: {
            userId: userId,
            title: title,
            description: content,
        },
    });

    if (!post) {
        return null;
    }
    return post;
}
