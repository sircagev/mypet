"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Title from '@/app/components/Title'; 

const page = () => {

    const [pet, setPet] = useState([]);
    const router = useRouter()
    const { id } = useParams(); // Obtén el id desde useParams


    const getPet = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/pets/${id}`);
            setPet(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deletePet = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/pets/${id}`);
            console.log(response.data);
            if (typeof window !== 'undefined') {
                router.push('/Mascotas');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPet();
    }, []);

    if (!pet) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='bg-blue-800 w-full min-h-screen flex flex-col items-center '>
            <Title title="Consultar Mascotas"></Title>
            <img src={`/${pet.photo}`} alt="" className='w-[160px] h-[160px] rounded-[50%]' />
            <div className='flex flex-col gap-3 px-7 py-[12px] w-full'>
                <div className='w-full bg-black h-[46px] rounded-lg flex'>
                    <div className='w-[35%] h-full bg-[#788CCF] rounded-l-lg flex items-center p-4'>
                        <p className='text-white font-semibold'>Nombre: </p>
                    </div>
                    <div className='w-[65%] h-full bg-[#A5B3DF] rounded-r-lg p-4 flex items-center'>
                        <p className=''>{pet.name}</p>
                    </div>
                </div>
                <div className='w-full bg-black h-[46px] rounded-lg flex'>
                    <div className='w-[35%] h-full bg-[#788CCF] rounded-l-lg flex items-center p-4'>
                        <p className='text-white font-semibold'>Raza: </p>
                    </div>
                    <div className='w-[65%] h-full bg-[#A5B3DF] rounded-r-lg p-4 flex items-center'>
                        <p>{pet.race?.name}</p>
                    </div>
                </div>
                <div className='w-full bg-black h-[46px] rounded-lg flex'>
                    <div className='w-[35%] h-full bg-[#788CCF] rounded-l-lg flex items-center p-4'>
                        <p className='text-white font-semibold'>Categoría: </p>
                    </div>
                    <div className='w-[65%] h-full bg-[#A5B3DF] rounded-r-lg p-4 flex items-center'>
                        {pet.category?.name}
                    </div>
                </div>
                <div className='w-full bg-black h-[46px] rounded-lg flex'>
                    <div className='w-[35%] h-full bg-[#788CCF] rounded-l-lg flex items-center p-4'>
                        <p className='text-white font-semibold'>Género: </p>
                    </div>
                    <div className='w-[65%] h-full bg-[#A5B3DF] rounded-r-lg p-4 flex items-center'>
                        {pet.gender?.name}
                    </div>
                </div>
                <div className='flex w-full items-center justify-center gap-3'>
                    <a href={`/Mascotas/${id}/Modificar`}>
                        <img src="/btn-edit.svg" alt="" className='w-[50px]' />
                    </a>
                    <img src="/btn-delete.svg" alt="" className='w-[50px]' onClick={deletePet} />
                </div>
            </div>
        </div>
    )
}

export default page