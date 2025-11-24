"use server";

import {prisma} from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

const createUser = async () => {
    try {
        const user = await currentUser();
        if (!user) return null;

        const existingUser = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.emailAddresses[0].emailAddress,
                    name: `${user.firstName ?? ""} ${
                        user.lastName ?? ""
                    }`.trim(),
                },
            });
        }
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

export default createUser;
