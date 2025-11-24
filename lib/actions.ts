"use server";
import { currentUser } from "@clerk/nextjs/server";
import { TodoSchema } from "./formValidationSchemas";
import { prisma } from "./prisma";

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
                createdAt: "desc",
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
        await prisma.todo.delete({
            where: {
                id: todoId,
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
        if (!user && !todoId) {
            return { success: false, error: true };
        }
        const existingTodo = await prisma.todo.findFirst({
            where: {
                id: todoId,
                userId: user?.id,
            },
        });

        if (!existingTodo) {
            return { success: false, error: true };
        }

        await prisma.todo.update({
            where: {
                id: todoId
            }, 
            data:{
                title: data.title
            }
        });

        return { success: true, error: false };
        
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
};
