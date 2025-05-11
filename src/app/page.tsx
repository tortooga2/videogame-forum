import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth";
import createPost from "@/lib/backendFunction/createPost";
import getPosts from "@/lib/backendFunction/getPosts";

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/sign-in");

    const posts = await getPosts();

    return (
        <div>
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
                    width: "30%",
                    padding: "1rem",
                    border: "1px solid white",
                    borderRadius: "5px",
                }}
            >
                <h1>Create Post</h1>
                <input type="text" name="title" placeholder="Title" required />
                <textarea
                    name="content"
                    placeholder="Content"
                    required
                ></textarea>
                <button type="submit">Create Post</button>
            </form>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <h1>Posts</h1>
                {/* Render posts here */}
                {/* Example: posts.map(post => <Post key={post.id} post={post} />) */}
                {posts?.map((post) => (
                    <div key={post.id}>
                        <h2 style={{ fontSize: "large" }}>{post.title}</h2>
                        <p>{post.description}</p>
                        <p>By: {post.userId}</p>
                        <p>Created at: {post.createdAt.toString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
