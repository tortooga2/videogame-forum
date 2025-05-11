// lib/auth.ts (Frontend-only stub)

export const auth = async () => ({
    user: {
        id: "mock-user-id",
        name: "Mock User",
        email: "mock@example.com",
        image: "https://i.pravatar.cc/150?u=mockuser",
    },
});

export const handlers = {};
export const signIn = () => console.log("signIn() called");
export const signOut = () => console.log("signOut() called");
