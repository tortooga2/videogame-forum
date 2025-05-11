import prisma from "@/lib/prisma";

export default async function getTopUsersThisWeek(limit = 5) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const topUsers = await prisma.user.findMany({
        take: limit,
        orderBy: {
            questions: {
                _count: "desc",
            },
        },
        where: {
            questions: {
                some: {
                    createdAt: {
                        gte: oneWeekAgo,
                    },
                },
            },
        },
        select: {
            id: true,
            name: true,
            email: true,
            _count: {
                select: { questions: true },
            },
        },
    });

    return topUsers;
}
