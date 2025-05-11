import prisma from "@/lib/prisma";

import { hashPassword } from "./passwordScripts";
import { CredentialSchema } from "@/lib/schema/schema";

export const signUp = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const parsed = CredentialSchema.safeParse({ email, password });
    if (!parsed.success) {
        return null;
    }
    const existingUser = await prisma.user.findUnique({
        where: { email: parsed.data.email.toLowerCase() },
    });
    if (existingUser) {
        return null; // User already exists
    }
    const hash = await hashPassword(parsed.data.password);
    if (!hash) {
        return null;
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: parsed.data.email.toLowerCase(),
                passwordHash: hash,
            },
        });

        return user;
    } catch (e) {
        console.error("Error creating user:", e);
        return null;
    }

    return null;
};
