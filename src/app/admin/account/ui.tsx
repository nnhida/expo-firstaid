'use client'

import React, { useState } from "react"
import { addUser, deleteUser, editUser } from "@/api/user"
import { toast } from "sonner"
import { PiPlus } from "react-icons/pi"
import { CgClose } from "react-icons/cg"
import { userProps } from "@/types/type"

interface uiProps{
    userList: userProps[] | undefined
}

export default function Ui({userList}: uiProps) {

    const [open, setOpen] = useState<boolean>(false)
    const [typeForm, setTypeForm] = useState<string>('')
  
    const [userID, setuserID] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [telp, setTelp] = useState<string>('')
    const [role, setRole] = useState<string>('')


    function openForm(e: React.MouseEvent<HTMLButtonElement>, typeForm: string, data: userProps | null) {
        e.preventDefault()
        setTypeForm(typeForm)
        if (typeForm === 'edit') {
          setuserID(data?.userID || '')
          setName(data?.name || '')
          setEmail(data?.email || '')
          setPassword(data?.password || '')
          setTelp(data?.telp || '')
          setRole(data?.role || '')
        } else {
          setuserID('')
          setName('')
          setEmail('')
          setPassword('')
          setTelp('')
          setRole('')
        }
    
        setOpen((prevstate) => !prevstate)
    
      }
    
    
      async function Submit() {
        const formData = new FormData()
    
        if (userID) formData.append('userID', userID)
        if (name) formData.append('name', name)
        if (email) formData.append('email', email)
        if (password) formData.append('password', password)
        if (telp) formData.append('telp', telp)
        if (role) formData.append('role', role)
    
        if (typeForm === 'edit') {
          const result = await editUser(formData)
          if (result.error) {
            toast.error(result.error)
          } else {
            toast.success(result.success)
          }
        } else if (typeForm == 'add') {
            const result = await addUser(formData)
          if (result.error) {
            toast.error(result.error)
          } else {
            toast.success(result.success)
          }
        }
        setOpen((prevstate) => !prevstate)
      }

      async function delUser(e: React.MouseEvent<HTMLButtonElement>, userID : string) {

        e.preventDefault()
        confirm('yakin ingin menghapus data ini?')
        const result = await deleteUser(userID)
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
        }

      }
    return (
        <div>
            <section className='flex-col space-y-5 p-10 pt-40 h-screen'>
                <div className=' flex justify-between'>
                    <p className='text-4xl font-bold'>Account List</p>
                    <button onClick={(e) => openForm(e, 'add', null)} className='flex items-center space-x-2 bg-green-400 p-3 rounded-md active:scale-90 transition-all'>
                        <PiPlus className='fill-white size-5' />
                        <p className='font-semibold text-white'>Add User</p>
                    </button>
                </div>


                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-blue-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Telp
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList !== undefined && userList.map((item, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name || 'not available'}
                                </th>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">{item.telp || 'not available'}</td>
                                <td className="px-6 py-4">{item.role}</td>
                                <td className="px-6 py-4 flex space-x-5">
                                    <button onClick={(e) => delUser(e, item.userID)} className="font-medium py-1 px-3 bg-red-500 text-white rounded-md">
                                        Delete
                                    </button>
                                    <button onClick={(e) => openForm(e, 'edit', item)} className="font-medium py-1 px-3 bg-blue-500 text-white rounded-md">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>




            </section>
                <div className={`${open ? '' : 'hidden'} flex top-0 justify-center items-center bg-gray-800 bg-opacity-50 h-screen w-full z-50 fixed`}>
                    <div className='flex-col space-y-5 bg-white p-5 rounded-lg'>
                        <button onClick={() => setOpen((prevstate) => !prevstate)} className='p-2 rounded-full bg-red-500'><CgClose className=' stroke-white' /></button>
                        <form onSubmit={Submit} className=''>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="John"

                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email*</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="John@gmail"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password*</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="****"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">telp</label>
                                    <input
                                        type="telp"
                                        id="telp"
                                        name="telp"
                                        value={telp}
                                        onChange={(e) => setTelp(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="123-456"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Select Role
                                    </label>
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="" disabled>
                                            Choose a Role
                                        </option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="USER">User</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                </div>
        </div>
    )
}
