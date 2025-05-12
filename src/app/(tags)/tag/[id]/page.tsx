import { getTagById } from "@/lib/backendFunction/getTagbyId";
import { getQuestionsByTag } from "@/lib/backendFunction/getQuestionsByTag";
import { QuestionWithRelations } from "@/lib/backendFunction/getAllQuestion";

import PostCard from "@/app/components/PostCard";

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
        <div>
            <h1>{tag.name}</h1>
            <p>{tag.description}</p>
            <h1 className="text-2xl font-bold text-white mt-8">Posts</h1>
            <div className="flex flex-col gap-4">
                {questions.map((q) => (
                    <PostCard key={q.id} question={q} />
                ))}
            </div>
        </div>
    );
}
