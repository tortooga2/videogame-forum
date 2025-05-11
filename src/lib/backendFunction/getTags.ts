import prisma from "@/lib/prisma";
export default async function getTagsList() {
    const tags = await prisma.tag.findMany({
        orderBy: {
            name: "asc",
        },
    });
    return tags;
}
