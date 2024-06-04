import { PrismaClient } from '@prisma/client';
import path from 'path';
import { writeFile } from 'fs/promises';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    try {
        const { id } = params;

        const pet = await prisma.pets.findUnique({
            where: { id: parseInt(id) },
            include: {
                race: true,
                category: true,
                gender: true,
            }
        });

        if (!pet) {
            return new Response(JSON.stringify({ message: 'Pet not found' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }

        return new Response(JSON.stringify(pet), {
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
        /* const { id, photo, race_id, category_id, gender_id } = await request.json(); */
        const data = await request.formData();
        const photo = data.get('photo');
        const { id } = params;

        if (!photo) {
            return NextResponse.json({
                message: "Image is required",
            }, {
                status: 400,
            })
        }

        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(process.cwd(), 'public', photo.name);
        await writeFile(filePath, buffer)

        const updatedPet = await prisma.pets.update({
            where: { id: parseInt(id) },
            data: {
                name: data.get('name'),
                photo: photo.name,
                race_id: parseInt(data.get('race')),
                category_id: parseInt(data.get('category')),
                gender_id: parseInt(data.get('gender'))
            }
        });

        return new Response(JSON.stringify(updatedPet), {
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

        const deletedPet = await prisma.pets.delete({
            where: { id: parseInt(id) }
        });

        return new Response(JSON.stringify(deletedPet), {
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