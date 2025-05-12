import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function SignIn() {
  const session = await auth();
  if (session) redirect("/");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-[#0e0d22] text-white">
            <h1 className="text-3xl font-bold underline">Sign in Here!</h1>

            <button
                className="border border-gray-400 px-4 py-2 rounded-md hover:bg-[#1e1e30] transition"
                onClick={async () => {
                    "use server";
                    await signIn("github");
                }}
            >
                Sign in with GitHub
            </button>

            <div className="text-sm text-gray-400">or</div>

            <form
                action={async (formData: FormData) => {
                    "use server";
                    const email = formData.get("email");
                    const password = formData.get("password");

                    const signin = await signIn("credentials", {
                        email,
                        password,
                    }).catch((error) => {
                        console.error("Sign in error:", error);
                        return null;
                    });
                    console.log(signin);
                    if (!signin) {
                        console.error("Sign in failed");
                        return redirect("/sign-in");
                    }
                    redirect("/");
                }}
                className="flex flex-col gap-4 w-full max-w-xs"
            >
                <input
                    name="email"
                    placeholder="Email or username"
                    type="text"
                    required
                    autoComplete="email"
                    className="px-3 py-2 rounded bg-[#2a2942] text-white placeholder-gray-300 outline-none"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    autoComplete="password"
                    className="px-3 py-2 rounded bg-[#2a2942] text-white placeholder-gray-300 outline-none"
                />
                <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition"
                >
                    Sign in
                </button>
            </form>
        </div>

        <form
          action={async (formData: FormData) => {
            "use server";
            const email = formData.get("email");
            const password = formData.get("password");
            try {
              const signin = await signIn("credentials", { email, password });
              if (!signin) throw new Error("Invalid credentials");
              redirect("/");
            } catch (error) {
              console.error("Sign in failed", error);
            }
          }}
          className="space-y-4"
        >
          <input
            name="email"
            type="text"
            placeholder="Email or username"
            required
            autoComplete="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
