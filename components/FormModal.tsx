"use client";
import React, { Dispatch, JSX, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import dynamic from "next/dynamic";
import Spinner from "./Spinner";
import { Todo } from "@/app/generated/prisma/client";
import {
    deleteTodo,
    emptyTrash,
    moveToTrash,
    restoreTodo,
} from "@/lib/actions";
import { ArchiveRestore, Loader2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

// const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
//     loading: () => <Spinner/>
// })

// const StudentForm = dynamic(() => import("./forms/StudentForm"), {
//     loading: () => <Spinner/>
// })

const TodoForm = dynamic(() => import("./TodoForm"), {
    loading: () => <Spinner />,
});

const forms: {
    [key: string]: (
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        type: "create" | "update",
        data?: Todo,
        id?: string | undefined
    ) => JSX.Element;
} = {
    todo: (setOpen, type, data, id) => (
        <TodoForm setOpen={setOpen} type={type} data={data} id={id} />
    ),
};

const Form = ({
    type,
    id,
    data,
    setOpen,
}: {
    type:
        | "create"
        | "update"
        | "delete"
        | "moveToTrash"
        | "emptyTrash"
        | "restore";
    id?: string;
    data?: Todo;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [loading, setLoading] = useState<boolean | null>(false);
    const router = useRouter();
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        const res = await deleteTodo(id);
        if (res.success) {
            toast("Todo deleted successfully!");
            setLoading(false);
            setOpen(false);
            router.refresh();
        } else {
            toast("Failed to delete Todo!");
        }
    };

    const handleMoveToTrash = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        setLoading(true);
        const res = await moveToTrash(id);
        if (res.success) {
            toast("Todo Moved to Bin Successfully!");
            setLoading(false);
            setOpen(false);
            router.refresh();
        } else {
            toast("Failed to Move Todo!");
        }
    };
    const handleEmptyTrash = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        const res = await emptyTrash();
        if (res.success) {
            toast("Trash Emptied Successfully");
            setLoading(false);
            setOpen(false);
            router.refresh();
        } else {
            toast("Failed to empty the trash!");
        }
    };

    const handleRestore = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        const res = await restoreTodo(id);
        if (res.success) {
            toast("Trash Emptied Successfully");
            setLoading(false);
            setOpen(false);
            router.refresh();
        } else {
            toast("Failed to empty the trash!");
        }
    };
    if (type === "delete" && id) {
        return (
            <form className="p-4 flex flex-col gap-4 items-center justify-center">
                <span className="text-center font-medium">
                    All the data will be lost. Are you sure you want to delete
                    this todo: <span className="font-bold">{data?.title}</span>?
                </span>
                <Button
                    variant="destructive"
                    className="bg-red-500 text-white hover:bg-red-600 w-fit cursor-pointer"
                    onClick={handleDelete}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Deleting...
                        </>
                    ) : (
                        "Delete"
                    )}
                </Button>
            </form>
        );
    }

    if (type === "moveToTrash" && id) {
        return (
            <form className="p-4 flex flex-col gap-4 items-center justify-center">
                <span className="text-center font-medium">
                    Are you sure you want to move todo {" "}
                    <span className="font-bold">{data?.title}</span> to recycle
                    bin?
                </span>
                <Button
                    variant="destructive"
                    className="bg-red-500 text-white hover:bg-red-600 w-fit cursor-pointer"
                    onClick={handleMoveToTrash}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Moving...
                        </>
                    ) : (
                        "Move Item"
                    )}
                </Button>
            </form>
        );
    }

    if (type === "emptyTrash") {
        return (
            <form className="p-4 flex flex-col gap-4 items-center justify-center">
                <span className="text-center font-medium">
                    All the data will be lost <span className="font-bold">permanently</span>. Are you sure you want
                    to empty the trash?{" "}
                </span>
                <Button
                    variant="destructive"
                    className="bg-red-500 text-white hover:bg-red-600 w-fit cursor-pointer"
                    onClick={handleEmptyTrash}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Emptying...
                        </>
                    ) : (
                        "Empty Trash"
                    )}
                </Button>
            </form>
        );
    }

    if (type === "restore") {
        return (
            <form className="p-4 flex flex-col gap-4 items-center justify-center">
                <span className="text-center font-medium">
                    This action will restore the item. Are you sure you want to
                    restore: <span className="font-bold">{data?.title}</span>?
                </span>
                <Button
                    variant="destructive"
                    className="bg-green-600 text-white hover:bg-green-600 w-fit cursor-pointer"
                    onClick={handleRestore}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Restoring...
                        </>
                    ) : (
                        "Restore"
                    )}
                </Button>
            </form>
        );
    }

    if (type === "create" || type === "update") {
        return forms["todo"](setOpen, type, data, id);
    }

    return <div className="p-4">Form not found</div>;
};

const FormModal = ({
    type,
    data,
    id,
}: {
    type:
        | "create"
        | "update"
        | "delete"
        | "moveToTrash"
        | "emptyTrash"
        | "restore";
    data?: Todo;
    id?: string | undefined;
}) => {
    const size = type === "create" ? "w-9 h-9" : "w-8 h-8";
    const bgColor =
        type === "create"
            ? "bg-yellow"
            : type === "update"
            ? "bg-sky"
            : type === "moveToTrash"
            ? "bg-purple"
            : "bg-red-400";

    const [open, setOpen] = useState(false);

    // const Form = () => {
    //     return type === "delete" && id ? (
    //         <form action="" className="p-4 flex flex-col gap-4 items-center justify-center">
    //             <span className="text-center font-medium">All the data will be lost. Are you sure you want to delete this item?</span>
    //             <Button variant="destructive" className="bg-red-500 text-white hover:bg-red-600 w-fit cursor-pointer">Delete</Button>
    //         </form>
    //     ) : type === "create" || type === "update" ? (
    //        <div>{type}</div>
    //     ) : "form not found";
    // }
    return (
        <>
            {type === "emptyTrash" ? (
                <button
                    onClick={() => setOpen(true)}
                    className="px-3 py-1.5 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center gap-1.5 shadow-sm hover:shadow transition-all"
                >
                    <Trash2 className="w-4 h-4" />
                    Empty Trash
                </button>
            ) : type === "delete" ? (
                <button
                    onClick={() => setOpen(true)}
                    className="w-8 h-8 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-sm hover:shadow transition-all"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            ) : type === "restore" ? (
                <button
                    onClick={() => setOpen(true)}
                    className="w-8 h-8 text-sm font-medium bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-sm hover:shadow transition-all"
                >
                    {/* <Image src={`/restore.png`} width={16} height={16} alt="" /> */}
                    <ArchiveRestore className="w-4 h-4" />
                </button>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className={`${size} hover:-translate-y-0.5 hover:transition-all hover:delay-50 cursor-pointer flex items-center justify-center rounded-full ${bgColor}`}
                >
                    <Image src={`/${type}.png`} alt="" width={16} height={16} />
                </button>
            )}

            {open && (
                <div className="w-screen h-screen fixed left-0 top-0 bg-black/60 dark:bg-black/40 backdrop-blur-xs z-[9999] flex items-center justify-center">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-md relative w-[90%] nd:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                        <Form
                            type={type}
                            setOpen={setOpen}
                            id={id}
                            data={data}
                        />
                        <div
                            className="absolute top-3 right-3 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <Image
                                src="/close.png"
                                alt=""
                                width={14}
                                height={14}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormModal;
