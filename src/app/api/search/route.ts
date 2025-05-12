import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const searchParams = new URL(req.url).searchParams;
    const raw = searchParams.get("search");

    if (!raw) {
        return NextResponse.json(
            { message: "missing search parameters" },
            { status: 400 }
        );
    }

    const decoded = decodeURIComponent(raw);
    const search = decoded.trim().split(/\s+/).join(":* & ");

    const tags = await prisma.tag.findMany({
        where: {
            name: {
                search: search,
            },
        },
        orderBy: {
            _relevance: {
                fields: ["name"],
                search: search,
                sort: "asc",
            },
        },
        take: 5,
    });

    const questions = await prisma.question.findMany({
        where: {
            title: {
                search: search,
            },
            description: {
                search: search,
            },
        },
        orderBy: {
            _relevance: {
                fields: ["title", "description"],
                search: search,
                sort: "asc",
            },
        },
        take: 5,
        include: {
            poster: { select: { id: true, name: true, email: true } },
            tag: { select: { id: true, name: true, color: true } },
            answers: true,
        },
    });

    const answers = await prisma.answer.findMany({
        where: {
            answer: {
                search: search,
            },
        },
        orderBy: {
            _relevance: {
                fields: ["answer"],
                search: search,
                sort: "asc",
            },
        },
        take: 5,
        include: {
            poster: { select: { id: true, name: true, email: true } },
            question: {
                select: {
                    id: true,
                },
            },
        },
    });

    return NextResponse.json(
        {
            tags,
            questions,
            answers: answers.map((a) => ({
                ...a,
                questionId: a.question.id,
            })),
        },
        { status: 200 }
    );
}
