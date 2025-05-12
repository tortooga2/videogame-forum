import { getQuestionById } from "@/lib/backendFunction/getQuestionById";
import {
    getAnswersByQuestion,
    AnswerWithRelations,
} from "@/lib/backendFunction/getAnswersByQuestion";
import { redirect } from "next/navigation";
import createAnswer from "@/lib/backendFunction/createAnswer";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";

import VoteArea from "@/app/components/voteArea";

export default async function QuestionPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (!id)
        return (
            <div className="text-center text-red-400">
                404 - Question Not Found
            </div>
        );

    const question = await getQuestionById(id);
    if (!question)
        return (
            <div className="text-center text-red-400">
                404 - Question Not Found
            </div>
        );

    const answers = (await getAnswersByQuestion(id)) as AnswerWithRelations[];

    return (
        <div
            className="min-h-screen px-6 py-8 space-y-10"
            style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
            }}
        >
            {/* Question Section */}
            <Link
                href="/"
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-2xl font-medium"
            >
                <IoIosArrowDropleft className="text-4xl" />
                <span className="hidden sm:inline">Back</span>
            </Link>

            <div
                className="space-y-3 border border-gray-700 p-6 rounded-md"
                style={{
                    backgroundColor: "var(--card-bg)",
                    color: "var(--text-color)",
                }}
            >
                <h1 className="text-3xl font-bold underline">
                    {question.title}
                </h1>
                <p style={{ color: question.tag.color }}>{question.tag.name}</p>
                <p className="text-sm text-gray-400">
                    By: {question.poster.email.split("@")[0]}{" "}
                </p>
                <p className="text-sm text-gray-400">
                    Created: {new Date(question.createdAt).toLocaleString()}
                </p>

                <p className="">{question.description}</p>

                <p className="text-sm text-gray-500">
                    Updated: {new Date(question.updatedAt).toLocaleString()}
                </p>
                <VoteArea postId={question.id} postType="question" />
            </div>

            {/* Answers List */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Answers ({answers.length})
                </h2>
                {!answers || answers.length === 0 ? (
                    <p className="text-gray-400 italic">
                        No answers yet. Be the first to reply.
                    </p>
                ) : (
                    answers.map((answer) => (
                        <div
                            key={answer.id}
                            className=" border border-gray-700 rounded-md p-5"
                            style={{
                                backgroundColor: "var(--bg-color)",
                                color: "var(--text-color)",
                            }}
                        >
                            <div className="whitespace-pre-line">
                                {answer.answer}
                            </div>
                            <div className="mt-4 text-sm flex justify-between items-center">
                                <span>
                                    By: {answer.poster.email.split("@")[0]}
                                </span>
                                <span>
                                    {new Date(
                                        answer.createdAt
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <VoteArea postId={answer.id} postType="answer" />
                        </div>
                    ))
                )}
            </div>

            {/* Answer Form */}
            <form
                action={async (formData: FormData) => {
                    "use server";
                    const res = await createAnswer(formData, id);
                    if (!res) {
                        console.error("Post creation failed");
                        return;
                    }
                    redirect("/question/" + id);
                }}
                className="flex flex-col gap-4 p-6 border border-gray-700 rounded-md  mt-10"
                style={{
                    backgroundColor: "var(--card-bg)",
                    color: "var(--text-color)",
                }}
            >
                <h2 className="text-xl font-semibold">Your Answer</h2>
                <textarea
                    name="content"
                    placeholder="Write your answer here..."
                    required
                    className="h-40 resize-none border border-gray-600 rounded-md p-3 placeholder-gray-400 outline-none"
                    style={{
                        backgroundColor: "var(--bg-color)",
                        color: "var(--text-color)",
                    }}
                ></textarea>
                <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded w-fit"
                >
                    Post Answer
                </button>
            </form>
        </div>
    );
}
