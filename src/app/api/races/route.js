import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const races = await prisma.races.findMany();
        return new Response(JSON.stringify(races), {
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
        const newRace = await prisma.races.create({
            data: { name }
        });
        return new Response(JSON.stringify(newRace), {
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