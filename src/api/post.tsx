'use server';

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPostAll() {
    try {
        const data = prisma.post.findMany()
        await prisma.$disconnect()
        return data
    } catch (err) {
        console.log('error in: ' + err)
        await prisma.$disconnect()
    }
}

export async function getPostCount() {
    try {
        const data = prisma.post.count()
        await prisma.$disconnect()
        return data
    } catch (err) {
        console.log('error in: ' + err)
        await prisma.$disconnect()
    }

}
export async function addPost(formData: FormData) {
    try {
        const session = await getSession()
        const loginID = String(session?.data.userID)
        const title = String(formData.get('title'))
        const desc = String(formData.get('desc'))
        const image = String(formData.get('image'))
        
        await prisma.post.create({
            data: {
                title: title,
                desc: desc,
                image: image,
                userID: loginID,

            }
        })
        await prisma.$disconnect()
        revalidatePath('/','layout')
        return {
            success: 'success add Post'
        }
    } catch (err) {
        console.log('error is: ' + err)
        await prisma.$disconnect()
        return {
            error: 'something wrong'
        }
    }
}
export async function editPost(formData: FormData) {
    try {
        const session = await getSession()
        const loginID = String(session?.data.userID)

        const postID = String(formData.get('postID'))
        const title = String(formData.get('title'))
        const desc = String(formData.get('desc'))
        const image = String(formData.get('image'))


        await prisma.post.update({
            where:{
                postID: postID
            },
            data: {
                title: title,
                desc: desc,
                image: image,
                userID: loginID,

            }
        })
        await prisma.$disconnect()
        revalidatePath('/','layout')
        return {
            success: 'success edit Post'
        }
    } catch (err) {
        console.log('error is: ' + err)
        await prisma.$disconnect()
        return {
            error: 'something wrong'
        }
    }
}

export async function deletePost(postID: string) {
    try {
       await prisma.post.delete({
            where: {
                postID: postID
            }
        })

        await prisma.$disconnect()
        revalidatePath('/','layout')
        return {
            success: 'success delete post'
        }
    } catch (err) {
        console.log('error in: ' +err)
        return{
            error: 'something wrong'
        }
    }
}