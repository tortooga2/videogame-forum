import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
    const session = await auth();
    if (session) redirect("/");

    return (
        <div>
            <h1>Sign in Here!</h1>
            <p>Sign in to access your account.</p>

            <button
                style={{ border: "1px solid white" }}
                onClick={async () => {
                    "use server";
                    await signIn("github");
                }}
            >
                Sign in with GitHub
            </button>

            <form
                action={async (formData: FormData) => {
                    "use server";
                    const email = formData.get("email");
                    const password = formData.get("password");
                    await signIn("credentials", {
                        email,
                        password,
                    });
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
