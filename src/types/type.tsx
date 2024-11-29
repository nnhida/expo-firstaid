import { Role } from "@prisma/client"

export interface userProps {
    userID: string
    email: string
    password: string
    name?: string | null
    telp?: string | null
    role: Role
}

export interface postProps {
    postID: string
    title: string
    desc: string
    image: string
    userID: string
}