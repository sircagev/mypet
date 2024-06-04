import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const categories = await prisma.categories.findMany();
        return new Response(JSON.stringify(categories), {
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
        const { name } = await request.json();
        const newGender = await prisma.categories.create({
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