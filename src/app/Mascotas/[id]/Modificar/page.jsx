import React from 'react'

const page = () => {
  return (
    <div className='bg-blue-800 w-full min-h-screen flex flex-col items-center '>
            <div className='flex flex-col items-center justify-center top-0 sticky w-full gap-3 z-10 bg-blue-800 p-7'>
                <div className='flex w-full h-20 justify-center items-center'>
                    <a href="/Mascotas">
                        <img src='/btn-back.svg' />
                    </a>
                    <h1 className='text-white text-xl font-semibold w-full text-center'>Modificar Mascota</h1>
                    <a href="/Login">
                        <img src='/icon/btn-close.svg' className='' />
                    </a>
                </div>
            </div>
            <img src="/photo-lg-1.svg" alt="" className='w-2/5' />
            <div className='flex flex-col gap-3 px-7 py-[12px] w-full'>
                <input
                    type="text"
                    className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'
                    placeholder='Nombre'
                    value='LAlalal'
                />
                <select
                    className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'>
                    <option value="" className='font-semibold text-opacity-50'>Doberman</option>
                    <option value="" className='font-semibold opacity-50'>Raza 1</option>
                    <option value="" className='font-semibold opacity-50'>Raza 1</option>
                </select>
                <select
                    className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'>
                    <option value="" className='font-semibold text-opacity-50'>Perro</option>
                    <option value="" className='font-semibold opacity-50'>Raza 1</option>
                    <option value="" className='font-semibold opacity-50'>Raza 1</option>
                </select>
                <input
                    type="text"
                    className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'
                    placeholder='Cambiar Foto'
                />
                <select
                    className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'>
                    <option value="" className='font-semibold text-opacity-50'>Macho</option>
                    <option value="" className='font-semibold opacity-50'>Macho</option>
                    <option value="" className='font-semibold opacity-50'>Hembra</option>
                </select>
                <button
                    className='w-[100%] py-3 font-semibold text-white flex justify-center items-center bg-green-400 rounded-full'
                >
                    Modificar
                </button>
            </div>
        </div>
  )
}

export default page