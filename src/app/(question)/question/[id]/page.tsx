import { getQuestionById } from "@/lib/backendFunction/getQuestionById";
import getAnswersByQuestion from "@/lib/backendFunction/getAnswersByQuestion";

import { redirect } from "next/navigation";

import createAnswer from "@/lib/backendFunction/createAnswer";

<<<<<<< HEAD
import VoteArea from "@/app/components/voteArea";
=======
import VoteArea from "@/components/voteArea";
import Answer from "@/components/answer";
>>>>>>> origin/main

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
    const question = await getQuestionById(id);
    if (!question) {
        return <div>404 not found</div>;
    }

    const answers = await getAnswersByQuestion(id);
    if (!answers) {
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

            <form
                action={async (formData: FormData) => {
                    "use server";
                    const res = await createAnswer(formData, id);
                    if (!res) {
                        // Handle error (e.g., show a message to the user)
                        console.error("Post creation failed");
                        return;
                    }
                    redirect("/question/" + id);
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1rem",
                    border: "1px solid white",
                    borderRadius: "0.5rem",
                }}
            >
                <h1>New Answer</h1>
                <textarea
                    name="content"
                    placeholder="Content"
                    required
                    style={{
                        height: "200px",
                        resize: "none",
                        border: "1px solid white",
                        borderRadius: "0.5rem",
                        padding: "0.5rem",
                    }}
                ></textarea>
                <button type="submit" className="hover:bg-[#666666] w-fit p-2">
                    Post Answer
                </button>
            </form>

            <div className="flex flex-col gap-[1rem] p-[1rem]">
                {answers.map((answer) => (
                    <Answer answer={answer} key={answer.id} />
                ))}
            </div>
        </div>
    );
}
