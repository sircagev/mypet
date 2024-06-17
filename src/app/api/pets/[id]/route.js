import { PrismaClient } from '@prisma/client';
import path from 'path';
import { writeFile, mkdir, unlink } from 'fs/promises';
import withAuth from '../../auth/withAuth';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    try {
        const verifyUser = await withAuth(request);

        if (verifyUser.status === 400) {
            const json = await verifyUser.json();
            return NextResponse.json(json);
        }

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

        const verifyUser = await withAuth(request);

        if (verifyUser.status === 400) {
            const json = await verifyUser.json();
            return NextResponse.json(json);
        }

        const data = await request.formData();
        const photo = data.get('photo');
        const { id } = params;

        if (!photo) {
            return NextResponse.json({
                message: "Image is required",
            }, {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            })
        }

        const pet = await prisma.pets.findUnique({ where: { id: parseInt(id) } });

        if (!pet) {
            return NextResponse.json({
                message: "Pet not found",
            }, {
                headers: { 'Content-Type': 'application/json' },
                status: 404,
            });
        }

        let newFileName;
        let filePath;

        if ((typeof photo) !== 'string') {
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);
            // Obtener la extensión del archivo
            const extension = path.extname(photo.name);
            const userFolder = path.join(process.cwd(), 'public', 'uploads');
            // Crear la carpeta si no existe
            await mkdir(userFolder, { recursive: true });

            // Crear un nuevo nombre para la imagen con la marca de tiempo
            newFileName = `${path.basename(data.get('name'), extension)}-${Date.now()}${extension}`;
            filePath = path.join(userFolder, newFileName);
            await writeFile(filePath, buffer)
        } else {
            newFileName = photo;
        }

        const updatedPet = await prisma.pets.update({
            where: { id: parseInt(id) },
            data: {
                name: data.get('name'),
                photo: `uploads/${newFileName}`,
                race_id: parseInt(data.get('race')),
                category_id: parseInt(data.get('category')),
                gender_id: parseInt(data.get('gender'))
            }
        });

        // Eliminar la foto anterior si se ha subido una nueva
        if (typeof photo !== 'string' && pet.photo) {
            const oldFilePath = path.join(process.cwd(), 'public', pet.photo);
            await unlink(oldFilePath).catch(err => {
                console.error("Error deleting old file:", err);
            });
        }

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

        const verifyUser = await withAuth(request);

        if (verifyUser.status === 400) {
            const json = await verifyUser.json();
            return NextResponse.json(json);
        }

        const { id } = params;

        const pet = await prisma.pets.findUnique({ where: { id: parseInt(id) } });

        const deletedPet = await prisma.pets.delete({
            where: { id: parseInt(id) }
        });

        const oldFilePath = path.join(process.cwd(), 'public', pet.photo);
        await unlink(oldFilePath).catch(err => {
            console.error("Error deleting old file:", err);
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