import { PrismaClient } from '@prisma/client';
import { writeFile, mkdir } from 'fs/promises'
import { NextResponse } from 'next/server';
import path from 'path';
import withAuth from '../auth/withAuth';

const prisma = new PrismaClient();

export async function GET(request) {
    try {

        const verifyUser = await withAuth(request);

        if (verifyUser.status === 400) {
            const json = await verifyUser.json();
            return NextResponse.json(json);
        }

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
        const verifyUser = await withAuth(request);

        if (verifyUser.status === 400) {
            const json = await verifyUser.json();
            return NextResponse.json(json);
        }

        const data = await request.formData();
        const photo = data.get('photo');

        if (!photo) {
            return NextResponse.json({
                message: "Image is required",
            }, {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            })
        }

        const userFolder = path.join(process.cwd(), 'public', 'img');
        // Crear la carpeta si no existe
        await mkdir(userFolder, { recursive: true });

        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Obtener la extensión del archivo
        const extension = path.extname(photo.name);

        // Crear un nuevo nombre para la imagen con la marca de tiempo
        const newFileName = `${path.basename(data.get('name'), extension)}-${Date.now()}${extension}`;
        const filePath = path.join(userFolder, newFileName);
        await writeFile(filePath, buffer)

        const newPet = await prisma.pets.create({
            data: {
                name: data.get('name'),
                photo: `img/${newFileName}`,
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
        console.log(error)
        return new Response(JSON.stringify({ message: 'Error: ' + error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}