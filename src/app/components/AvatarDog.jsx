import React from 'react'

const AvatarDog = () => {
  return (
    <div className='bg-[rgba(255,255,255,.8)]  rounded-3xl w-full  p-4 flex'>
      <div className='w-3/5 flex items-center '>
        <img src="/photo-lg-1.svg" alt="" className='w-1/2 rounded-[50%]' />
        <div className='pl-[4px]'>
          <h2 className='font-bold'>Nombre</h2>
          <p>Raza</p>
        </div>
      </div>
      <div className='flex items-center justify-center gap-3'>
        <a href="/Mascotas/1">
          <img src="btn-show.svg" alt="" />
        </a>
        <a href="/Mascotas/1/Modificar">
          <img src="btn-edit.svg" alt="" />
        </a>
        <img src="btn-delete.svg" alt="" />
      </div>
    </div>
  )
}

export default AvatarDog