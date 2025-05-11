import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth";
import createPost from "@/lib/backendFunction/createQuestion";
import getPosts from "@/lib/backendFunction/getQuestion";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Tabbar from "./components/Tabbar";
import PostCard from "./components/PostCard";
import GameNewsCarousel from "./components/GameNewsCarousel";

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/sign-in");

    const questions = await getPosts();

    return (
        <div className="w-full min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>


            <Navbar user={session.user?.email} />
            <Tabbar />

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-4">
                {/* LEFT: Create Post + Posts */}
                <div className="md:col-span-2 space-y-6">
                    {/* Create Post Form */}
                    <form
                        action={async (formData: FormData) => {
                            "use server";
                            const res = await createPost(formData);
                            if (!res) {
                                console.error("Post creation failed");
                                return;
                            }
                            redirect("/");
                        }}
                        className="flex flex-col gap-4 p-4 border border-gray-600 rounded-md bg-[#1a1c2c]"
                    >
                        <h1 className="text-xl font-bold text-white">Create Post</h1>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            required
                            className="border-b border-gray-600 bg-transparent text-white placeholder-white outline-none p-2"
                        />
                        <textarea
                            name="content"
                            placeholder="Content"
                            required
                            className="h-40 resize-none border border-gray-600 rounded-md p-2 bg-transparent text-white placeholder-white"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Posts List */}
                    <h1 className="text-2xl font-bold text-white">Posts</h1>
                    <div className="flex flex-col gap-4">
                        {questions?.map((q) => (
                            <PostCard
                                key={q.id}
                                id={q.id}
                                userId={q.userId}
                                title={q.title}
                                description={q.description}
                                createdAt={q.createdAt}
                                upvotes={q.upvotes}
                                downvotes={q.downvotes}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT: Sidebar */}
                <div className="flex flex-col gap-6 h-full text-black">
                        <GameNewsCarousel />
                    

                    <div className="bg-white p-4 rounded-md shadow-md ">
                        <h2 className="text-lg font-bold mb-2">🏆 Top Users This Week</h2>
                        <ul className="list-disc list-inside">
                            <li>@PixelMage</li>
                            <li>@BossHunter</li>
                            <li>@Level99</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}
