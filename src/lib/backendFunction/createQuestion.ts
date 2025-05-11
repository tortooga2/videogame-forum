// app/actions/createQuestion.ts

export default async function createPost(formData: FormData) {
    const title = formData.get("title");
    const content = formData.get("content");

    if (typeof title !== "string" || typeof content !== "string") {
        return null;
    }

    // ✅ Mock a "created" post
    return {
        id: "mock-id-" + Math.random().toString(36).slice(2),
        userId: "mock-user-id",
        title,
        description: content,
        createdAt: new Date().toISOString(),
    };
}
