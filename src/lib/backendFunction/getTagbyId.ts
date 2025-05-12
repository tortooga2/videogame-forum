import prisma from "@/lib/prisma";
import { Tag } from "@prisma/client";

export const getTagById = async (tagId: string): Promise<Tag | null> => {
    if (!tagId) {
        console.error("Tag ID is required");
        return null;
    }

    const tag = await prisma.tag.findUnique({
        where: { id: tagId },
    });

    if (!tag) {
        console.error("Tag not found");
        return null;
    }

    return tag;
};
