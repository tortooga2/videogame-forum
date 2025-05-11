import { signUp } from "@/lib/authActions";
import { redirect } from "next/navigation";

export default function SignUp() {
    return (
        <div>
            <h1>Sign up Here!</h1>
            <p>Sign up to create an account.</p>
            <form
                action={async (formData: FormData) => {
                    "use server";
                    const res = await signUp(formData);
                    if (!res) {
                        // Handle error (e.g., show a message to the user)
                        console.error("Sign up failed");
                        return;
                    }
                    redirect("/sign-in");
                }}
            >
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    required
                    autoComplete="email"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    autoComplete="new-password"
                />
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}
