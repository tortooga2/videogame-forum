import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import createPost from "@/lib/backendFunction/createQuestion";
import TagTable from "./components/TagTable";
import {
    getPosts,
    QuestionWithRelations,
} from "@/lib/backendFunction/getAllQuestion";
import Navbar from "./components/Navbar";
import AdBlock from "./components/Ad";
import { FaTrophy } from "react-icons/fa";

import GameNewsCarousel from "./components/GameNewsCarousel";
import getTopUsersThisWeek from "@/lib/backendFunction/getTopUsers";
import PostFeed from "./components/PostFeed";
import getTagsList from "@/lib/backendFunction/getTags";

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/sign-in");

    const questions = await getPosts();
    const topUsers = await getTopUsersThisWeek();

    const tags = await getTagsList();

    return (
        <div className="w-full min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
            <Navbar
                user={session.user?.email ? session.user.email : "Anonymous"}
            />

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
                        className="flex flex-col gap-4 p-4 border border-gray-600 rounded-md"
                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
                    >
                        <h1 className="text-xl font-bold">
                            Create Post
                        </h1>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            required
                            className="border-b border-gray-600 bg-transparent   outline-none p-2"
                        />
                        <select id="tag" name="tagid" required>
                            <option key={"0"} value={"0"}>
                                Select a tag
                            </option>
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                        <textarea
                            name="content"
                            placeholder="Content"
                            required
                            className="h-40 resize-none border border-gray-600 rounded-md p-2 bg-transparent"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Posts List */}
                    <PostFeed
                        questions={questions as QuestionWithRelations[]}
                        tags={tags}
                    />
                </div>

                {/* RIGHT: Sidebar */}
                <div className="flex flex-col gap-6 h-full">
                    <GameNewsCarousel />

                    <div className=" rounded-md shadow-md p-4 h-auto border border-gray-600" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
                        <h2 className="text-lg font-bold mb-2 flex gap-2 items-center">
                            <FaTrophy className="text-yellow-400" /> Top Users
                            This Week
                        </h2>

                        <ul className="list-disc list-inside text-sm">
                            {topUsers.map((user) => (
                                <li key={user.id}>
                                    @{user.name ?? user.email.split("@")[0]} (
                                    {user._count.questions})
                                </li>
                            ))}
                        </ul>
                    </div>

                    <AdBlock />
                    <TagTable tags={tags} />
                </div>
            </div>
        </div>
    );
}
