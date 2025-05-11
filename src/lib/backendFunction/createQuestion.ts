import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function createPost(formData: FormData) {
    const title = formData.get("title");
    const content = formData.get("content");
    const tagid = formData.get("tagid");
    if (!title || !content || !tagid) {
        return null;
    }
    if (
        typeof title !== "string" ||
        typeof content !== "string" ||
        typeof tagid !== "string"
    ) {
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
            tagid: tagid,
        },
    });

    if (!post) {
        return null;
    }
    return post;
}
