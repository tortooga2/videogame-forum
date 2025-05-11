import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";

import { CredentialSchema } from "@/lib/schema/schema";

import { comparePassword } from "./passwordScripts";
import { v4 as uuid } from "uuid";

import { encode as defaultEncode } from "next-auth/jwt";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: adapter,
    providers: [
        Github,
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsed = CredentialSchema.safeParse(credentials);
                if (!parsed.success) {
                    return null;
                }
                const { email, password } = parsed.data;

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.passwordHash) {
                    return null;
                }

                console.log("user", user);

                const isMatch = await comparePassword(
                    password,
                    user.passwordHash
                );
                console.log("isMatch", isMatch);
                if (!isMatch) {
                    return null;
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === "credentials") {
                token.credentials = true;
            }
            return token;
        },
    },

    jwt: {
        encode: async function (params) {
            if (params.token?.credentials) {
                const sessionToken = uuid();

                if (!params.token.sub) {
                    throw new Error("Failed to create session");
                }

                const createdSession = await adapter?.createSession?.({
                    sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                });

                if (!createdSession) {
                    throw new Error("Failed to create session");
                }
                return sessionToken;
            }
            return defaultEncode(params);
        },
    },
});
