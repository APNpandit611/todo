import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { trashTodos } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs/server";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon } from "lucide-react";

const TodoBin = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
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

    // 5. Render the list of todos
    return (
        <div className="px-4 dark:border-slate-700 max-w-7xl mx-auto">
            <div className="h-[calc(80vh-4rem)] overflow-y-auto py-4">
                <h1 className="text-3xl font-bold mb-6">Your Todos</h1>

                <div className="space-y-3">
                    {todos.data?.map((todo) => (
                        <div
                            key={todo.id}
                            className="flex flex-col md:flex-row md:gap-4 p-4 rounded-lg border dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm"
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className="flex-1 space-y-1">
                                    <h4
                                        className={`text-base font-medium leading-relaxed ${
                                            todo.isCompleted
                                                ? " dark:text-gray-400 line-through"
                                                : " dark:text-gray-100"
                                        }`}
                                    >
                                        {todo.title}
                                    </h4>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-500 dark:bg-slate-900">
                                        <CalendarIcon className="h-3.5 w-3.5" />
                                        <span className="text-xs">
                                            Created{" "}
                                            {formatDistanceToNow(
                                                new Date(todo.createdAt),
                                                { addSuffix: true }
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3">
                                <FormModal
                                    type="delete"
                                    id={todo.id}
                                    data={todo}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Pagination page={p} count={todos?.count} />
        </div>
    );
};

export default TodoBin;
