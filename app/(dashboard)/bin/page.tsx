import BinList from "@/components/BinList";
import FloatingTrashWarning from "@/components/FloatingTrashWarning";
import Pagination from "@/components/Pagination";

import { TodoListLoader } from "@/components/TodoListLoader";
import { trashTodos } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs/server";

import { Suspense } from "react";

const TodoBin = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    // 5. Render the list of todos

    const user = await currentUser();
    const { page } = await searchParams;
    const p = page ? parseInt(page) : 1;

    // 2. If no user, show a message or redirect
    if (!user) {
        return (
            <div className="container mx-auto p-6">
                <p className="text-center text-gray-500">
                    Please log in to see your todos.
                </p>
            </div>
        );
    }

    //fetch the data and queryparams
    const todos = await trashTodos({ p });

    // 4. Handle the case where there are no todos
    if (todos.data?.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    Your Todo Recycle Bin is Empty!
                </p>
            </div>
        );
    }
    return (
        <div className="px-4 dark:border-slate-700 max-w-7xl mx-auto">
            <FloatingTrashWarning />
            <Suspense fallback={<TodoListLoader />}>
                <BinList todos={todos} />
            </Suspense>
            <Pagination page={p} count={todos?.count} />
        </div>
    );
};

export default TodoBin;
