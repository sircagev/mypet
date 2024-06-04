import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    try {
        console.log(params)
        const { id } = params;
        const gender = await prisma.categories.findUnique({
            where: { id: parseInt(id) }
        });
        if (!gender) {
            return new Response(JSON.stringify({ message: 'Category  not found' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }
        return new Response(JSON.stringify(gender), {
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

export async function PUT(request, { params }) {
    try {
        const { name } = await request.json();
        const { id } = params;
        const updatedGender = await prisma.categories.update({
            where: { id: parseInt(id) },
            data: { name }
        });
        return new Response(JSON.stringify(updatedGender), {
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

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const deletedGender = await prisma.categories.delete({
            where: { id: parseInt(id) }
        });
        return new Response(JSON.stringify(deletedGender), {
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