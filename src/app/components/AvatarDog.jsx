import { Button } from '@mui/material'
import React from 'react'
import Link from 'next/link'

const AvatarDog = ({ race, name, photo, id, deletePet }) => {
  return (
    <div className='bg-[rgba(255,255,255,.8)]  rounded-3xl w-full  p-4 flex' key={id}>
      <div className='w-3/5 flex items-center '>
        <img src={photo} alt="" className='w-[90px] h-[90px] rounded-[50%]' />
        <div className='pl-[5px]'>
          <h2 className='font-bold'>{name}</h2>
          <p>{race}</p>
        </div>
      </div>
      <div className='flex items-center justify-center gap-3'>
        <Link href={`/Mascotas/${id}`}>
          <img src="btn-show.svg" alt="" />
        </Link>
        <Link href={`/Mascotas/${id}/Modificar`}>
          <img src="btn-edit.svg" alt="" />
        </Link>
        <Button onClick={deletePet}>
          <img src="btn-delete.svg" alt="" />
        </Button>
      </div>
    </div>
  )
}

export default AvatarDog