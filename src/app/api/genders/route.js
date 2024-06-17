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

        const genders = await prisma.genders.findMany();
        return new Response(JSON.stringify(genders), {
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

        const verifyUser = await withAuth(request);

        if (verifyUser.status === 400) {
            const json = await verifyUser.json();
            return NextResponse.json(json);
        }

        const { name } = await request.json();
        const newGender = await prisma.genders.create({
            data: { name }
        });
        return new Response(JSON.stringify(newGender), {
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