import { PrismaClient } from '@prisma/client';
import withAuth from '../auth/withAuth';

const prisma = new PrismaClient();

export async function GET(request) {
    try {

        const verifyUser = await withAuth(request);

        if (verifyUser.status === 400) {
            const json = await verifyUser.json();
            return NextResponse.json(json);
        }

        const users = await prisma.users.findMany();
        return new Response(JSON.stringify(users), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error: ' + error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}

export async function POST(request) {
    try {
        const { fullname, email, password } = await request.json();
        const newUser = await prisma.users.create({
            data: { email, fullname, password }
        });
        return new Response(JSON.stringify(newUser), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error: ' + error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}