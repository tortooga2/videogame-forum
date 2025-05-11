import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth";
import createPost from "@/lib/backendFunction/createQuestion";
import getAllQuestions from "@/lib/backendFunction/getAllQuestion";

import Link from "next/link";

import VoteArea from "@/components/voteArea";

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/sign-in");

    const questions = await getAllQuestions();

    return (
        <div
            style={{
                margin: "auto",
                maxWidth: "800px",
                paddingTop: "2rem",
                paddingBottom: "2rem",
            }}
        >
            <div>
                <span>{session.user?.email}</span>
            </div>
            <button
                onClick={async () => {
                    "use server";
                    await signOut();
                }}
            >
                Sign out
            </button>
            <form
                action={async (formData: FormData) => {
                    "use server";
                    const res = await createPost(formData);
                    if (!res) {
                        // Handle error (e.g., show a message to the user)
                        console.error("Post creation failed");
                        return;
                    }
                    redirect("/");
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
                <h1>New Question</h1>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    style={{
                        borderBottom: "1px solid white",
                    }}
                />
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
                    Create Post
                </button>
            </form>
            <h1
                style={{
                    fontSize: "xx-large",
                    padding: "1rem",
                }}
            >
                Posts
            </h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    height: "100%",
                    overflowY: "auto",
                }}
            >
                {/* Render posts here */}
                {/* Example: posts.map(post => <Post key={post.id} post={post} />) */}
                {questions?.map((question) => (
                    <div
                        key={question.id}
                        style={{
                            border: "1px solid white",
                            padding: "1rem",
                            gap: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "0.5rem",
                        }}
                    >
                        <Link href={`question/${question.id}`}>
                            <h2
                                style={{
                                    fontSize: "large",
                                    textDecoration: "underline",
                                }}
                            >
                                {question.title}
                            </h2>
                            <p>By: {question.userId}</p>
                            <p>Created at: {question.createdAt.toString()}</p>
                            <p>{question.description}</p>
                        </Link>
                        <VoteArea postId={question.id} postType={"question"} />
                    </div>
                ))}
            </div>
        </div>
    );
}
