import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function SignIn() {
    const session = await auth();
    if (session) {
        redirect("/");
        return null;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0e0d22] p-4 text-white">
            <div className="w-full max-w-md bg-[#1e1e30] rounded-xl shadow-xl p-8 space-y-8">
                <h1 className="text-4xl font-extrabold text-center tracking-tight text-white">
                    Sign In Here
                </h1>

                <button
                    type="button"
                    onClick={async () => {
                        "use server";
                        await signIn("github");
                    }}
                    className="w-full flex items-center justify-center gap-3 bg-transparent border-2 border-gray-400 py-2 rounded-md hover:bg-[#1e1e30] cursor-pointer transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    <Image
                        src="/github_logo.svg"
                        alt="GitHub logo"
                        width={24}
                        height={24}
                        className="opacity-90"
                    />
                    <span className="font-medium">Sign in with GitHub</span>
                </button>

                <div className="flex items-center">
                    <hr className="flex-grow border-gray-600" />
                    <span className="px-2 text-sm text-gray-400">or</span>
                    <hr className="flex-grow border-gray-600" />
                </div>

                <form
                    action={async (formData: FormData) => {
                        "use server";
                        const email = formData.get("email");
                        const password = formData.get("password");

                        const result = await signIn("credentials", {
                            email,
                            password,
                        }).catch((error) => {
                            console.error("Sign in error:", error);
                            return null;
                        });

                        if (!result) {
                            console.error("Sign in failed");
                            redirect("/sign-in");
                            return;
                        }

                        redirect("/");
                    }}
                    className="space-y-4"
                >
                    <input
                        name="email"
                        type="text"
                        placeholder="Email or username"
                        required
                        autoComplete="email"
                        className="w-full px-4 py-2 bg-[#2a2942] text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        autoComplete="current-password"
                        className="w-full px-4 py-2 bg-[#2a2942] text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 cursor-pointer transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white font-semibold py-2 rounded-md"
                    >
                        Sign in
                    </button>
                </form>

                <div className="text-center text-sm text-gray-400">
                    {"Don't have an account?"}{" "}
                    <Link
                        href="/sign-up"
                        className="text-cyan-500 hover:underline"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
