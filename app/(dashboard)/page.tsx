import FormModal from "@/components/FormModal";
import { TodoListLoader } from "@/components/TodoListLoader";
import TodoLists from "@/components/TodoLists";
import TodoSearch from "@/components/TodoSearch";
import { createUser } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const user = await currentUser();
    await createUser(user);
    return (
        <div className="max-w-7xl mx-auto bg-transparent px-4 dark:bg-slate-900 dark:text-white dark:border-slate-700">
            <div className="my-2 sticky top-2 z-50 dark:bg-slate-900 p-4 shadow-md flex items-center justify-between">
                <h1 className="text-xl font-bold">Lists</h1>
                <div className="flex flex-row gap-2">
                    <div className="hidden md:flex">
                        <TodoSearch />
                    </div>
                    <FormModal type="create" />
                    {/* <TodoLists userId={user?.id}/> */}
                </div>
            </div>
            <Suspense fallback={<TodoListLoader />}>
                <TodoLists searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
