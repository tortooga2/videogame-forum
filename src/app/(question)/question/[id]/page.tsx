import prisma from "@/lib/prisma";
export default async function QuestionPage({
    params: { id },
}: {
    params: { id: string };
}) {
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
            <div style={{ display: "flex", gap: "1rem" }}>
                <button>{question.upvotes}</button>
                <p>|</p>
                <button>{question.downvotes}</button>
            </div>
        </div>
    );
}
