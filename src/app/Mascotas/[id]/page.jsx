import React from 'react'

const page = () => {
    return (
        <div className='bg-blue-800 w-full min-h-screen flex flex-col items-center '>
            <div className='flex flex-col items-center justify-center top-0 sticky w-full gap-3 z-10 bg-blue-800 p-7'>
                <div className='flex w-full h-20 justify-center items-center'>
                    <a href="/Mascotas">
                        <img src='/btn-back.svg' />
                    </a>
                    <h1 className='text-white text-xl font-semibold w-full text-center'>Consultar Mascota</h1>
                    <a href="/Login">
                        <img src='/icon/btn-close.svg' className='' />
                    </a>
                </div>
            </div>
            <img src="/photo-lg-1.svg" alt="" className='w-2/5' />
            <div className='flex flex-col gap-3 px-7 py-[12px] w-full'>
                <img src="/info-name.svg" alt="" />
                <img src="/info-race.svg" alt="" />
                <img src="/info-category.svg" alt="" />
                <img src="/info-gender.svg" alt="" />
                <div className='flex w-full items-center justify-center gap-3'>
                    <a href="/Mascotas/1/Modificar">
                        <img src="/btn-edit.svg" alt="" className='w-[50px]' />
                    </a>
                    <img src="/btn-delete.svg" alt="" className='w-[50px]' />
                </div>
            </div>
        </div>
    )
}

export default page