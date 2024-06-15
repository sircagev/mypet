import { PrismaClient } from '@prisma/client';
import { writeFile, mkdir } from 'fs/promises'
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

        console.log(pets)
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
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            })
        }


        const userName = data.get('username');
        const userFolder = path.join(process.cwd(), 'public', userName);
        // Crear la carpeta si no existe
        await mkdir(userFolder, { recursive: true });

        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Obtener la extensión del archivo
        const extension = path.extname(photo.name);

        // Crear un nuevo nombre para la imagen con la marca de tiempo
        const newFileName = `${path.basename(photo.name, extension)}-${Date.now()}${extension}`;
        const filePath = path.join(userFolder, newFileName);
        await writeFile(filePath, buffer)

        const newPet = await prisma.pets.create({
            data: {
                name: data.get('name'),
                photo: `${userName}/${newFileName}`,
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
