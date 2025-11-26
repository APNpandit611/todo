"use server";
import { currentUser } from "@clerk/nextjs/server";
import { TodoSchema } from "./formValidationSchemas";
import { prisma } from "./prisma";
import type { User } from "@clerk/nextjs/server";
import { Prisma } from "@/app/generated/prisma/client";

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

export const getTodos = async ({
    p,
    queryParams,
}: {
    p: number;
    queryParams: { [key: string]: string | undefined };
}) => {
    const ITEM_PER_PAGE = 5;
    const user = await currentUser();
    const query: Prisma.TodoWhereInput = {
        userId: user?.id,
    };

    try {
        // const data = await prisma.todo.findMany({
        //     where: {
        //         userId: user?.id,
        //     },
        //     orderBy: {
        //         updatedAt: "desc",
        //     },
        // });

        if (queryParams) {
            for (const [key, value] of Object.entries(queryParams)) {
                if (value !== undefined) {
                    switch (key) {
                        case "search":
                            query.OR = [
                                {
                                    title: {
                                        contains: value,
                                        mode: "insensitive",
                                    },
                                },
                            ];
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        const [data, count] = await prisma.$transaction([
            prisma.todo.findMany({
                where: query,
                orderBy: {
                    updatedAt: "desc",
                },
                take: ITEM_PER_PAGE,
                skip: ITEM_PER_PAGE * (p - 1),
            }),
            prisma.todo.count({ where: query }),
        ]);
        return { data: data, count: count, success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
};

export const deleteTodo = async (todoId: string | undefined) => {
    try {
        const user = await currentUser();
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
        if (updatedTodo.count === 0) return { success: false, error: true };

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

export async function toggleTodo(checked: boolean, todoId: string) {
    await prisma.todo.update({
        where: { id: todoId },
        data: {
            isCompleted: checked,
        },
    });
}
