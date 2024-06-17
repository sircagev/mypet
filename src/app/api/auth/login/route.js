import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            throw new Error('Correo electrónico y contraseña son requeridos');
        }

        console.log(email, password)

        const user = await prisma.users.findUnique({
            where: { email: email }
        });

        if (!user) throw new Error('Usuario no encontrado');

        const matchPassword = password === user.password;

        if (!matchPassword) throw new Error('Contraseña Incorrecta');

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) * 60 * 60 * 4,
            id: user.id,
            name: user.fullname,
            email: user.email
        }, process.env.JWT_SECRET)

        const response = NextResponse.json({
            message: 'Authorized',
        });

        response.cookies.set({
            name: "myPetToken",
            value: token,
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 2,
            path: "/",
        });

        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
        });
    }
}

export async function GET(request) {
    try {
        const cookieStore = cookies();
        const myPetToken = cookieStore.get("myPetToken");

        if (!myPetToken) {
            return NextResponse.json({
                error: "Not logged in"
            });
        }

        const user = jwt.verify(myPetToken.value, process.env.JWT_SECRET);

        return NextResponse.json({
            id: user.id,
            email: user.email,
            name: user.name
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
        });
    }
}

export async function DELETE(request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("myPetToken");
        console.log(token);

        if (!token) {
            return NextResponse.json({
                message: "Not logged in",
            }, {
                status: 401,
            })
        }
        cookieStore.delete("myPetToken");

        const response = NextResponse.json(
            {},
            {
                status: 200,
            }
        );

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json(error.message, {
            status: 500,
        });
    }
}