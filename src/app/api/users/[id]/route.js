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

        const { id } = params;
        const user = await prisma.users.findUnique({
            where: { id: parseInt(id) }
        });
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }
        return new Response(JSON.stringify(user), {
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

        const { fullname, email, password } = await request.json();
        const { id } = params;
        const updatedUser = await prisma.users.update({
            where: { id: parseInt(id) },
            data: { fullname, email, password }
        });
        return new Response(JSON.stringify(updatedUser), {
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
        const deletedUser = await prisma.users.delete({
            where: { id: parseInt(id) }
        });
        return new Response(JSON.stringify(deletedUser), {
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