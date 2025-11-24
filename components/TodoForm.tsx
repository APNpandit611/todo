"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { todoSchema, TodoSchema } from "@/lib/formValidationSchemas";
import { createTodo, updateTodo } from "@/lib/actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TodoForm = ({
    type,
    data,
    setOpen,
    id,
}: {
    type: "create" | "update";
    data?: TodoSchema;
    id?: string | undefined;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TodoSchema>({
        resolver: zodResolver(todoSchema),
        defaultValues: { title: data?.title || "" },
    });
    const [loading, setLoading] = useState<boolean | null>(false);
    const onSubmit = async (data: TodoSchema) => {
        try {
            setLoading(true);
            console.log("id, data", id, data)
            if (type === "create") {
                await createTodo(data);
                toast("Todo created successfully!");
            } else if (type === "update" && data) {
                await updateTodo(id, data);
                toast("Todo updated successfully!");
            }

            router.refresh();
        } catch (error) {
            console.log(error);
            toast("Something went wrong!");
        } finally {
            setLoading(false);
            reset();
            setOpen(false);
        }
    };
    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-xl font-semibold capitalize">
                {type} a new Todo
            </h1>
            <div className="flex flex-col gap-7 md:flex-row md:justify-between">
                <InputField
                    label="Title"
                    type="text"
                    defaultValue={data?.title}
                    register={register}
                    name="title"
                    error={errors.title}
                />
                <div className="flex items-end justify-end w-full md:w-[30%]">
                    <button className="w-full p-2 bg-blue-400 text-white rounded-md">
                        {loading ? (
                            type === "create" ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Creating...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Updating...</span>
                                </div>
                            )
                        ) : type === "create" ? (
                            "Create"
                        ) : (
                            "Update"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default TodoForm;
