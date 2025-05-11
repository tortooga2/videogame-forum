import prisma from "@/lib/prisma";

export default async function getPosts() {
    const posts = await prisma.question.findMany();
    if (!posts) {
        return null;
    }
    return posts;
}
