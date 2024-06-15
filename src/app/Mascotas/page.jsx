"use client"
import React, { useEffect, useState } from 'react'
import AvatarDog from '../components/AvatarDog'
import { signOut } from 'next-auth/react'
import axios from 'axios'

const page = () => {

    const [pets, setPets] = useState([]);

    const getPets = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/pets');
            const data = response.data;
            setPets(data);
        } catch (error) {
            console.error(error);
        }
    }

    const deletePet = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/pets/${id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPets()
    }, [pets])

    return (
        <div className='bg-blue-800 w-full min-h-screen '>
            <div className='flex flex-col items-center justify-center top-0 sticky w-full gap-3 z-10 bg-blue-800 p-7'>
                <div className='flex w-full h-20 justify-center items-center'>
                    <h1 className='text-white text-xl font-semibold w-full text-center'>Administrar Mascotas</h1>
                    <button onClick={() => signOut()}>
                        <img src='/icon/btn-close.svg' className='' />
                    </button>
                </div>
                <a href="/Mascotas/crear">
                    <img src="/icon/btn-add.svg" alt="" className='mt-[20px]' />
                </a>
            </div>
            <div className='flex flex-col gap-3 overflow-y-auto px-7 py-[12px]'>
                {pets.map(pet => (
                    <AvatarDog name={pet.name} race={pet.race.name} photo={pet.photo} id={pet.id} deletePet={() => deletePet(pet.id)} />
                ))}

            </div>
        </div>
    )
}

export default page