'use client';


import { Spinner } from 'flowbite-react';
import React, {  useState } from 'react'
import { toast } from 'sonner';
import { login } from '@/api/login';
import { useRouter } from 'next/navigation';

export default function Page() {

  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function submit() {
    setIsLoading(true)
    const formData = new FormData()
    if(email) formData.append('email', email)
    if(password) formData.append('password', password)

    const result = await login(formData)
    if (result.error) {
      toast.error(result.error)
      setIsLoading(false)
    } else{
      toast.success(result.success)
      if (result.role === 'ADMIN') {
        router.push('/admin')
      } else{
        router.push('/')
      }
    }

  }

  return (
    <div className='flex'>
      <div className='flex items-center justify-center h-screen w-[50%]'>
        <div className='flex-col space-y-5 w-[50%]'>

          <p className='text-5xl font-bold text-gray-900'>Login</p>

          <div className='flex-col space-y-2'>
            <p className='text-lg font-medium'>Email</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' className='w-full rounded-md bg-transparent border-2 border-blue-500' required />
          </div>

          <div className='flex-col space-y-2'>
            <p className='text-lg font-medium'>Password</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' className='w-full rounded-md bg-transparent border-2 border-blue-500'required />
          </div>

          <div className='flex justify-end'>
            <button onClick={submit} className='py-2 px-4 flex space-x-2 bg-blue-500 w-32 rounded-md active:scale-90 transition-all' disabled={isLoading}>
              {isLoading ?
                <>
                  <Spinner />
                  <p className='text-white font-semibold'>loading...</p>
                </>
                :
                <p className='text-white font-semibold text-center mx-auto'>Login</p>
              }
            </button>
          </div>
        </div>
      </div>
      <div style={{ backgroundImage: 'url("/login.jpg")' }} className='h-screen w-[50%] bg-slate-400 bg-cover bg-right'></div>
    </div>
  )
}
