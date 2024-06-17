import { PrismaClient } from '@prisma/client';
import withAuth from '../../auth/withAuth';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    try {

        const verifyUser = await withAuth(request);

        if (verifyUser.status === 400) {
            const json = await verifyUser.json();
            return NextResponse.json(json);
        }

        console.log(params)
        const { id } = params;
        const race = await prisma.races.findUnique({
            where: { id: parseInt(id) }
        });
        if (!race) {
            return new Response(JSON.stringify({ message: 'Gender not found' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }
        return new Response(JSON.stringify(race), {
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

        const { name } = await request.json();
        const { id } = params;
        const updatedGender = await prisma.races.update({
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

        const verifyUser = await withAuth(request);

        if (verifyUser.status === 400 ) {
            const json = await verifyUser.json();
            return NextResponse.json(json);
        }

        const { id } = params;
        const deletedGender = await prisma.races.delete({
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