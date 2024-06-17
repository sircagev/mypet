import React, { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation';
import axios from 'axios';

const Title = ({ children, title }) => {

    const currentRoute = usePathname();

    const logOut = async () => {
        try {
            const response = axios.delete('/api/auth/login')
            signOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center top-0 sticky w-full gap-3 z-10 bg-blue-800 p-7'>
            <div className='flex w-full h-20 justify-center items-center'>
                <a href="/Mascotas" className={`${currentRoute == "/Mascotas" ? 'hidden' : ''}`}>
                    <img src='/btn-back.svg' />
                </a>
                <h1 className='text-white text-xl font-semibold w-full text-center'>{title}</h1>
                <button onClick={logOut}>
                    <img src='/icon/btn-close.svg' className='' />
                </button>
            </div>
            {children}
        </div>
    )
}

export default Title;