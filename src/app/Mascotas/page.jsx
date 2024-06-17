"use client"
import React, { useEffect, useState } from 'react'
import AvatarDog from '../components/AvatarDog'
import axios from 'axios'
import Title from '../components/Title'

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
            getPets()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPets()
    }, [])

    return (
        <div className='bg-blue-800 w-full min-h-screen '>
            <Title title="Administrar Mascotas">
                <a href="/Mascotas/crear">
                    <img src="/icon/btn-add.svg" alt="" className='mt-[20px]' />
                </a>
            </Title>
            <div className='flex flex-col gap-3 overflow-y-auto px-7 py-[12px]'>
                {pets.map(pet => (
                    <AvatarDog name={pet.name} race={pet.race.name} photo={pet.photo} id={pet.id} deletePet={() => deletePet(pet.id)} />
                ))}

            </div>
        </div>
    )
}

export default page