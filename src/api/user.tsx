'use server'

import prisma from "@/lib/prisma"
import { Role } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function getUserCount() {
    try {
        const data = prisma.user.count()
        await prisma.$disconnect()
        return data
    } catch (err) {
        console.log('error in: ' + err)
        await prisma.$disconnect()
    }
}

export async function getUserAll() {
    try {
        const data = prisma.user.findMany()
        await prisma.$disconnect()
        return data
    } catch (err) {
        console.log('error in: ' + err)
        await prisma.$disconnect()
    }
}

export async function findUser(userID: string) {
    try{
        const data = await prisma.user.findUnique({
            where:{
                userID: userID
            }
        })
        await prisma.$disconnect()
        return data

    }catch(err) {
        console.log('error in: '+err)
        await prisma.$disconnect()
        return{
            error: 'something wrong'
        }
    }
    
}

export async function addUser(formData: FormData) {
    try {
        const email = String(formData.get('email'))
        const password = String(formData.get('password'))
        const name = formData.get('name')
        const telp = formData.get('telp')
        const role = formData.get('role')

        await prisma.user.create({
            data: {
                name: name as string || undefined,
                email: email,
                password: password,
                telp: telp as string || undefined,
                role: role as Role,

            }
        })
        await prisma.$disconnect()
        revalidatePath('/', 'layout')
        return {
            success: 'success add User'
        }
    } catch (err) {
        console.log('error is: ' + err)
        await prisma.$disconnect()
        return {
            error: 'something wrong'
        }
    }
}
export async function editUser(formData: FormData) {
    try {
        const userID = String(formData.get('userID'))
        const email = String(formData.get('email'))
        const password = String(formData.get('password'))
        const name = formData.get('name')
        const telp = formData.get('telp')
        const role = formData.get('role')

        await prisma.user.update({
            where: {
                userID: userID
            },
            data: {
                name: name as string || undefined,
                email: email,
                password: password,
                telp: telp as string || undefined,
                role: role as Role,

            }
        })
        await prisma.$disconnect()
        revalidatePath('/', 'layout')
        return {
            success: 'success edit User'
        }
    } catch (err) {
        console.log('error is: ' + err)
        await prisma.$disconnect()
        return {
            error: 'something wrong'
        }
    }
}

export async function deleteUser(userID: string) {
    try {
        await prisma.user.delete({
            where: {
                userID: userID
            }
        })

        await prisma.$disconnect()
        revalidatePath('/', 'layout')
        return {
            success: 'success delete user'
        }
    } catch (err) {
        console.log('error in: ' + err)
        return {
            error: 'something wrong'
        }
    }
}