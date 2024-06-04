import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials, req) {

                const user = await prisma.users.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) throw new Error('User not found');

                const matchPassword = credentials.password === user.password;

                if (!matchPassword) throw new Error('Contraseña Incorrecta');

                return {
                    id: user.id,
                    name: user.fullname,
                    email: user.email
                };
            },
        }),
    ],
    pages: {
        signIn: "/Login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
