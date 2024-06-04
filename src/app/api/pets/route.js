import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server';
import path from 'path';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const pets = await prisma.pets.findMany({
            include: {
                race: true,
                category: true,
                gender: true
            }
        });
        return new Response(JSON.stringify(pets), {
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
        /* const { photo, race_id, category_id, gender_id } = await request.json(); */
        const data = await request.formData();
        const photo = data.get('photo');

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

        const newPet = await prisma.pets.create({
            data: {
                name: data.get('name'),
                photo: photo.name,
                race_id: parseInt(data.get('race')),
                category_id: parseInt(data.get('category')),
                gender_id: parseInt(data.get('gender'))
            }
        });

        return new Response(JSON.stringify(newPet), {
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
