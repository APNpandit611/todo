"use server"

import {prisma} from "@/lib/prisma";


const getUser = async () => {
    try {
        const user = await prisma.user.findMany({})
        return user;
    } catch (error) {
        console.log(error)
    }
}

export default getUser;