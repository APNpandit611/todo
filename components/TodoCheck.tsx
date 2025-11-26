"use client";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { toggleTodo } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const TodoCheck = ({
    todoId,
    isChecked,
}: {
    todoId: string;
    isChecked: boolean;
}) => {
    const [checked, setChecked] = useState(isChecked);
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const handleChange = async (value: boolean) => {
        setLoading(true)
        setChecked(value);
        await toggleTodo(value, todoId);
        setLoading(false)
        router.refresh();

    };

    return loading ? <Spinner /> : <Checkbox checked={checked} onCheckedChange={handleChange}/>;
};

export default TodoCheck;
