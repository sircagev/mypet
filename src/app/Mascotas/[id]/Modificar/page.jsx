"use client"
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import BasicModal from '@/app/components/BasicModal';
import Title from '@/app/components/Title';
import { useParams } from 'next/navigation';

const page = () => {
    const inputFileRef = useRef(null);
    const [races, setRaces] = useState([]);
    const [genders, setGenders] = useState([])
    const [categories, setCategories] = useState([])
    const [modalOpen, setModalOpen] = useState(false);

    const { id } = useParams(); // Obtén el id desde useParams

    const [pet, setPet] = useState([]);
    const [newPet, setNewPet] = useState({
        name: '',
        race: '',
        category: '',
        photo: null,
        gender: ''
    });

    const getPet = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/pets/${id}`);
            const petData = response.data
            setPet(petData);
            console.log(petData)
            setNewPet({
                name: petData.name,
                race: petData.race.id,
                category: petData.category.id,
                photo: petData.photo,
                gender: petData.gender_id
            })

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPet({
            ...newPet,
            [name]: value
        });
        console.log(newPet)
    };

    const handleFileCancel = () => {
        // Verificar si ya hay una imagen seleccionada
        if (!newPet.photo) {
            // Si no hay una imagen seleccionada, mostrar la imagen predeterminada
            setNewPet({
                ...newPet,
                photo: null // Asegurarse de que photo esté establecido en null
            });
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Si se seleccionó un archivo, actualizar el estado con la nueva imagen
            setNewPet({
                ...newPet,
                photo: selectedFile
            });
        }
        console.log(newPet)
    };

    const handleImageClick = () => {
        inputFileRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', newPet.name);
        data.append('race', newPet.race);
        data.append('category', newPet.category);
        data.append('photo', newPet.photo);
        data.append('gender', newPet.gender);

        console.log(data)

        try {
            const response = await axios.put(`http://localhost:3000/api/pets/${id}`, data);
            console.log(response.data); // Manejar la respuesta del servidor si es necesario
            setModalOpen(true);
        } catch (error) {
            console.error(error); // Manejar errores de la solicitud
        }
    };

    const getRaces = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/races');
            const data = response.data;
            setRaces(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/categories');
            const data = response.data;
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getGenders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/genders');
            const data = response.data;
            setGenders(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPet();
        getRaces();
        getCategories();
        getGenders();     
    }, []);

    if (!pet) return <div>Loading...</div>;

    return (
        <div className='bg-blue-800 w-full min-h-screen flex flex-col items-center '>
            <Title title="Modificar Mascota" />
            <form className='flex flex-col items-center justify-center w-full relative' onSubmit={handleSubmit}>
                {newPet.photo ? (
                    <>
                        <img
                            src={newPet.photo instanceof File ? URL.createObjectURL(newPet.photo) : `/${newPet.photo}`} // Mostrar la imagen seleccionada
                            alt="Foto de la mascota"
                            className='w-[160px] h-[160px] rounded-[50%]'
                        />
                        <div
                            className='absolute top-[120px] rigth-[50%] z-[90]'
                            onClick={handleImageClick}
                        >
                            <img src="/btn-edit.svg" alt="" />
                        </div></>
                ) : (
                    <>
                        <img
                            src={`/${pet.photo}`} // Mostrar la imagen predeterminada si no se selecciona ninguna imagen nueva
                            alt="Foto de la mascota predeterminada"
                            className='w-[160px] h-[160px] rounded-[50%]'

                        />
                        <div
                            className='absolute top-[120px] rigth-[50%] z-[90]'
                            onClick={handleImageClick}
                        >
                            <img src="/btn-edit.svg" alt="" />
                        </div>
                    </>
                )}
                <div className='flex flex-col gap-3 px-7 py-[12px] w-full'>
                    <input
                        type="text"
                        className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'
                        placeholder='Nombre'
                        name="name"
                        value={newPet.name}
                        onChange={handleChange}
                    />
                    <select
                        className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'
                        name="race"
                        value={newPet.race}
                        onChange={handleChange}>
                        <option value="" className='font-semibold text-opacity-50'>Seleccione una raza</option>
                        {races.map(race => (
                            <option key={race.id} value={race.id} className='font-semibold opacity-50'>{race.name}</option>
                        ))}
                    </select>
                    <select
                        className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'
                        name="category"
                        value={newPet.category}
                        onChange={handleChange}>
                        <option value="" className='font-semibold text-opacity-50'>Seleccione una categoría</option>
                        {categories.map(category => (
                            <option value={category.id} className='font-semibold opacity-50'>{category.name}</option>
                        ))}
                    </select>

                    <input
                        type="file"
                        className='hidden' // Esconder el input
                        ref={inputFileRef} // Referencia al input
                        onChange={handleFileChange}
                        onCancel={handleFileCancel} // Manejar la cancelación de la selección de archivo
                        name="photo"
                    />
                    <select
                        className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'
                        name="gender"
                        value={newPet.gender}
                        onChange={handleChange}>
                        <option value="" className='font-semibold text-opacity-50'>Seleccione el genero</option>
                        {genders.map(gender => (
                            <option value={gender.id} className='font-semibold opacity-50'>{gender.name}</option>
                        ))}
                    </select>
                    <button
                        className='w-[100%] py-3 font-semibold text-white flex justify-center items-center bg-green-400 rounded-full'
                        type='submit'
                    >
                        Guardar
                    </button>
                </div>
            </form>
            <BasicModal open={modalOpen} onClose={() => setModalOpen(false)} title="Actualización Exitosa" description="Has actualizado exitosamente tu mascota"></BasicModal>
        </div>
    )
}
export default page