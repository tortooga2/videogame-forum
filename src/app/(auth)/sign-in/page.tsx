// File: app/(auth)/sign-in/page.tsx
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function SignIn() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back
        </h1>

        <button
          onClick={async () => {
            "use server";
            await signIn("github");
          }}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition"
        >
          <Image
            src="/github_logo.svg"
            alt="GitHub logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with GitHub
        </button>

        <div className="flex items-center">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-2 text-gray-500 dark:text-gray-400">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
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
