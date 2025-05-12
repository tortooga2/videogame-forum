import { signUp } from "@/lib/authActions";
import { redirect } from "next/navigation";

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0e0d22] p-4 text-white">
      <div className="w-full max-w-md bg-[#1e1e30] rounded-xl shadow-xl p-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-center tracking-tight">
          Create Your Account
        </h1>
        <p className="text-center text-gray-400">
          Sign up to create an account.
        </p>

        <form
          action={async (formData: FormData) => {
            "use server";
            const res = await signUp(formData);
            if (!res) {
              console.error("Sign up failed");
              return;
            }
            redirect("/sign-in");
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full px-4 py-2 bg-[#2a2942] text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="new-password"
            className="w-full px-4 py-2 bg-[#2a2942] text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 cursor-pointer transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white font-semibold py-2 rounded-md"
          >
            Sign up
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a
            href="/sign-in"
            className="text-cyan-500 hover:underline"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
