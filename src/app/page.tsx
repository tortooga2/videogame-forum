import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth";

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/sign-in");

    return (
        <div>
            Hello world!
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
        </div>
    );
}
