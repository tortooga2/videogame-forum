import prisma from "@/lib/prisma";

import VoteArea from "@/components/voteArea";

export default async function QuestionPage({
    params,
}: {
    // params must be a Promise of your params shape
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (!id) {
        return <div>404 not found</div>;
    }
    const question = await prisma.question.findUnique({
        where: {
            id: id,
        },
    });
    if (!question) {
        return <div>404 not found</div>;
    }
    return (
        <div>
            <h1 style={{ fontSize: "xx-large", textDecoration: "underline" }}>
                {question.title}
            </h1>
            <p>{question.description}</p>
            <p>Created by: {question.userId}</p>
            <p>Created at: {question.createdAt.toString()}</p>
            <p>Updated at: {question.updatedAt.toString()}</p>
            <VoteArea postId={question.id} postType={"question"} />
        </div>
    );
}
