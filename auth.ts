import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Adresse e-mail", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") return null;

        const seller = await prisma.seller.findUnique({
          where: { email: email.trim().toLowerCase() },
        });
        if (!seller || !(await bcrypt.compare(password, seller.passwordHash))) return null;

        return { id: seller.id, email: seller.email, name: seller.name };
      },
    }),
  ],
});
