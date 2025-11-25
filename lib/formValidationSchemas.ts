import z from "zod";


export const todoSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Input must be at least 3 characters long!" })
        .max(100, { message: "Input must be at most 30 characters long!" }),
});

export type TodoSchema = z.infer<typeof todoSchema>