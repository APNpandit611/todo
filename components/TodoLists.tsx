// app/components/TodoLists.tsx
// This is a Server Component. It runs on the server to fetch data before sending HTML to the browser.

import { currentUser } from "@clerk/nextjs/server";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import FormModal from "./FormModal";
import { getTodos } from "@/lib/actions";

// The component itself is async to allow for data fetching
const TodoLists = async () => {
    // 1. Get the authenticated user's ID on the server
    const user = await currentUser();

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

    const todos = await getTodos();
    // 4. Handle the case where there are no todos
    if (todos.data?.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    You have no todos yet. Create one to get started!
                </p>
            </div>
        );
    }

    // 5. Render the list of todos
    return (
        <div className="py-4 ">
            <h1 className="text-3xl font-bold mb-6">Your Todos</h1>

            <div className="space-y-3">
                {todos.data?.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex flex-col md:flex-row md:gap-4 p-4 rounded-lg border dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm"
                    >
                        {/* Placeholder for a checkbox or other interactive element */}
                        {/* <div className="w-5 h-5 border-2 border-red-300 dark:border-slate-600  rounded mt-0.5" /> */}
                        <div className="flex gap-3 w-full">
                            <Checkbox className="h-5 w-5 mt-1" />
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
                            <FormModal type="update" id={todo.id} data={todo} />
                            <FormModal type="delete" id={todo.id} data={todo} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoLists;
