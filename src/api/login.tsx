'use server';

import { createSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import md5 from 'md5'




export async function login(formdata: FormData) {
    try{
    const email = String(formdata.get('email'))
    const password = String(formdata.get('password'))
    

    const data = await prisma.user.findUnique({
        where:{
            email: email,
        }
    })

    
    if (data !== null && md5(password) !== data.password) {
         return{
            error: 'password salah'
        }

    } else if (data === null) {
        const newUser = await prisma.user.create({
            data : {
                name: undefined,
                email: email,
                password: md5(password),
                telp: undefined
            }
        })

        await createSession(newUser)
        return {
            role: newUser.role,
            success: 'success add user'
        }
    }
    await prisma.$disconnect()

    await createSession(data)
    return {
        role: data.role,
        success: 'welcome back'
    }

    }catch(err) {
        console.log('error in: '+err)
        return{
            error: 'something wrong'
        }

    }    
}