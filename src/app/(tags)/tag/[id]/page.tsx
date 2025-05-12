import { getTagById } from "@/lib/backendFunction/getTagbyId";
import { getQuestionsByTag } from "@/lib/backendFunction/getQuestionsByTag";
import { QuestionWithRelations } from "@/lib/backendFunction/getAllQuestion";

import PostCard from "@/app/components/PostCard";

import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";

export default async function TagPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (!id) {
        return <div>Tag not found</div>;
    }
    const tag = await getTagById(id);
    const questions = (await getQuestionsByTag(id)) as QuestionWithRelations[];

    if (!tag) {
        return <div>Tag not found</div>;
    }

    return (
        <div style={{ maxWidth: "1250px", margin: "0 auto" }}>
            <Link
                href="/"
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-2xl font-medium"
            >
                <IoIosArrowDropleft className="text-4xl" />
                <span className="hidden sm:inline">Back</span>
            </Link>

            <h1
                style={{
                    color: tag.color,
                    fontSize: "2rem",
                    fontWeight: "bold",
                }}
            >
                {tag.name}
            </h1>
            <p>{tag.description}</p>
            <h1 className="text-2xl font-bold mt-8">Posts</h1>
            <div className="flex flex-col gap-4">
                {questions.map((q) => (
                    <PostCard key={q.id} question={q} />
                ))}
            </div>
        </div>
    );
}
