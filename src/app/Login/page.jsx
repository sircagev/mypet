"use client";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";
import axios from 'axios';

const page = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [error, setError] = useState(null);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const onSubmit = handleSubmit(async data => {
        submitJwt();
        console.log(data)
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        });

        if (res.error) {
            setError(res.error);
            console.log(res.error)
        } else {
            router.push('/Mascotas')
        }

        console.log(res)
    })

    const submitJwt = async () => {
        try {
            const response = await axios.post('/api/auth/login', credentials);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
        console.log(credentials)
    }

    return (
        <div
            className="flex min-h-screen justify-end flex-col rounded-[20px] max-w-[428px] m-auto p-4"
            style={{
                backgroundImage: "url('/bg-login.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: 'contain'
            }}>
            {error && (
                <div className='h-[60%] flex justify-center items-center px-[20px]'>
                    <span className='text-white text-xl w-full text-center bg-red-300 rounded-full p-3'>
                        {error}
                    </span>
                </div>
            )}
            <form className='flex flex-col w-full gap-3 p-[20px]' onSubmit={onSubmit}>
                <input
                    type="email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Email es requerido"
                        }
                    })}
                    className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'
                    placeholder='Correo Electrónico'
                    name='email'
                    onChange={onChange}
                />
                {errors.email && (
                    <span className='text-red-500 text-xs'>
                        {errors.email.message}
                    </span>
                )}
                <input
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Contraseña es requerida"
                        }
                    })}
                    className='w-[100%] py-3 pl-5 font-semibold opacity-50 rounded-full'
                    placeholder='Contraseña'
                    name='password'
                    onChange={onChange}
                />
                {errors.password && (
                    <span className='text-red-500 text-xs'>
                        {errors.password.message}
                    </span>
                )}
                <button
                    className='w-[100%] py-3 font-semibold text-white flex justify-center items-center bg-green-400 rounded-full'
                >
                    Ingresar
                </button>
            </form>
        </div>
    )
}

export default page