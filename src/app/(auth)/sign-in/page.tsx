import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
    const session = await auth();
    if (session) redirect("/");

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                gap: "1.5rem",
            }}
        >
            <h1
                style={{
                    fontSize: "xx-large",
                    textDecoration: "underline",
                }}
            >
                Sign in Here!
            </h1>

            <button
                style={{
                    border: "1px solid white",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                }}
                onClick={async () => {
                    "use server";
                    await signIn("github");
                }}
            >
                Sign in with GitHub
            </button>
            <div>or</div>

            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
                action={async (formData: FormData) => {
                    "use server";
                    const email = formData.get("email");
                    const password = formData.get("password");

                    const signin = await signIn("credentials", {
                        email,
                        password,
                    });
                    if (!signin) {
                        // Handle error (e.g., show a message to the user)
                        console.error("Sign in failed");
                        return;
                    }
                    redirect("/");
                }}
            >
                <input
                    name="email"
                    placeholder="Email or username"
                    type="text"
                    required
                    autoComplete="email"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    autoComplete="password"
                />
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}
