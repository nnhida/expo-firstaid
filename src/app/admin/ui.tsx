'use client';

import React from 'react'
import { FaNewspaper, FaUser } from 'react-icons/fa'
import { userProps } from '@/types/type';

interface adminProps{
    dataLogin: userProps| undefined,

    userCount: number | undefined,
    postCount: number | undefined,
}


export default function Ui({dataLogin,userCount, postCount,}: adminProps) {
    return (
        <div>
            <section className='w-full h-screen flex-col space-y-10 px-20 py-24'>
                <p className='text-5xl font-bold'>Welcome Back, Guest</p>

                <div className='flex justify-between'>
                    <div className='flex space-x-10'>
                        <div className='rounded-full w-56 h-56 bg-slate-400' />
                        <div className='flex-col space-y-5'>
                            <div className='flex space-x-5'>
                                <div className='flex-col space-y-3 text-2xl font-semibold'>
                                    <p>Name</p>
                                    <p>Email</p>
                                    <p>Telp</p>
                                </div>
                                <div className='flex-col space-y-3 text-2xl text-gray-500'>
                                    <p>{dataLogin?.name || 'not available'}</p>
                                    <p>{dataLogin?.email}</p>
                                    <p>{dataLogin?.telp || 'not available'}</p>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button className='py-1 px-4 bg-green-500 rounded-md'>
                                    <p className='text-white text-xl font-semibold'>Edit</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex-col bg-blue-400 space-y-10 p-5 rounded-lg w-60 '>
                        <p className='text-3xl font-semibold text-center text-white'>User</p>
                        <FaUser className='size-20  mx-auto fill-white' />
                        <p className='text-center text-white font-semibold text-3xl'>{userCount}</p>
                    </div>

                    <div className='flex-col bg-red-400 space-y-10 p-5 rounded-lg w-60 '>
                        <p className='text-3xl font-semibold text-center text-white'>Post</p>
                        <FaNewspaper className='size-20  mx-auto fill-white' />
                        <p className='text-center text-white font-semibold text-3xl'>{postCount}</p>
                    </div>
                </div>
            </section>

           
        </div>
    )
}
