"use server";
import { currentUser } from "@clerk/nextjs/server";
import { TodoSchema } from "./formValidationSchemas";
import { prisma } from "./prisma";
import type { User } from "@clerk/nextjs/server";


export const createTodo = async (data: TodoSchema) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        await prisma.todo.create({
            data: {
                title: data?.title,
                isCompleted: false,
                userId: user.id,
            },
        });

        // revalidatePath("/");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
};

export const getTodos = async () => {
    try {
        const user = await currentUser();
        const data = await prisma.todo.findMany({
            where: {
                userId: user?.id,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return { data: data, success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
};

export const deleteTodo = async (todoId: string | undefined) => {
    try {
        const user = await currentUser()
        await prisma.todo.delete({
            where: {
                id: todoId,
                userId: user?.id,
            },
        }); 
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
};

export const updateTodo = async (
    todoId: string | undefined,
    data: TodoSchema
) => {
    try {
        const user = await currentUser();
        if (!user || !todoId) {
            return { success: false, error: true };
        }
        // const existingTodo = await prisma.todo.findFirst({
        //     where: {
        //         id: todoId,
        //         userId: user?.id,
        //     },
        // });

        // if (!existingTodo) {
        //     return { success: false, error: true };
        // }

        const updatedTodo = await prisma.todo.updateMany({
            where: {
                id: todoId,
                userId: user.id,
            },
            data: {
                title: data.title,
            },
        });

        // only updateMany has .count property not update
        if (updatedTodo.count === 0) return { success:false, error: true}

        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
};

export const createUser = async (user: User | null) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: user?.id,
            },
        });

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    id: user?.id,
                    email: user?.emailAddresses[0]?.emailAddress ?? "",
                    name: `${user?.firstName ?? ""} ${
                        user?.lastName ?? ""
                    }`.trim(),
                },
            });
        }

        return { success: true, error: false };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: true };
    }
};

export async function getUserData(userId: string | undefined) {
    if (!userId) return null;

    return prisma.user.findUnique({
        where: { id: userId },
    });
}
