import { TodoListLoader } from "@/components/TodoListLoader";
import TodoLists from "@/components/TodoLists";
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
        <div className="px-4 dark:border-slate-700 max-w-7xl mx-auto">
            <Suspense fallback={<TodoListLoader />}>
                <TodoLists searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
