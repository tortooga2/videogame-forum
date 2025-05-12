import { getTagById } from "@/lib/backendFunction/getTagbyId";
import {
    getQuestionsByTag,
    QuestionModelWithCount,
} from "@/lib/backendFunction/getQuestionsByTag";

import PostFeed from "@/app/components/PostFeed";

export default async function TagPage({ params }: { params: { id: string } }) {
    const tagId = params.id;
    const tag = await getTagById(tagId);
    const questions = (await getQuestionsByTag(
        tagId
    )) as QuestionModelWithCount[];

    if (!tag) {
        return <div>Tag not found</div>;
    }

    return (
        <div>
            <h1>{tag.name}</h1>
            <p>{tag.description}</p>
            <PostFeed questions={questions} />
        </div>
    );
}
