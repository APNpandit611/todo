import BinList from "@/components/BinList";
import FloatingTrashWarning from "@/components/FloatingTrashWarning";

import { TodoListLoader } from "@/components/TodoListLoader";

import { Suspense } from "react";

const TodoBin = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    // 5. Render the list of todos
    return (
        <div className="px-4 dark:border-slate-700 max-w-7xl mx-auto">
            <Suspense fallback={<TodoListLoader />}>
                <FloatingTrashWarning />
                <BinList searchParams={searchParams} />
            </Suspense>
        </div>
    );
};

export default TodoBin;
