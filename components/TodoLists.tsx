

import { currentUser } from "@clerk/nextjs/server";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import FormModal from "./FormModal";
import { getTodos } from "@/lib/actions";
import Pagination from "./Pagination";

const TodoLists = async ({ searchParams }:{searchParams: Promise<{[key:string]:string | undefined}>}) => {
    const user = await currentUser();
    const { page, ...queryParams} = await searchParams
    const p = page ? parseInt(page) : 1

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
    const todos = await getTodos({p, queryParams});

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
        <div>
            <div className="h-[calc(80vh-4rem)] overflow-y-auto py-4 px-4 md:px-8">
                <h1 className="text-3xl font-bold mb-6">Your Todos</h1>

                <div className="space-y-3">
                    {todos.data?.map((todo) => (
                        <div
                            key={todo.id}
                            className="flex flex-col md:flex-row md:gap-4 p-4 rounded-lg border dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm"
                        >
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
                                <FormModal
                                    type="update"
                                    id={todo.id}
                                    data={todo}
                                />
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

export default TodoLists;



// "use client"; // make it a Client Component to handle loading states

// import { useState, useEffect, useTransition } from "react";
// import { formatDistanceToNow } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Checkbox } from "./ui/checkbox";
// import FormModal from "./FormModal";
// import Pagination from "./Pagination";
// import { getTodos } from "@/lib/actions";
// import { currentUser } from "@clerk/nextjs/server";
// import { Todo } from "@/app/generated/prisma/client";

// const TodoLists = ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [count, setCount] = useState(0);
//   const [isLoading, startTransition] = useTransition();
//   const [page, setPage] = useState(searchParams.page ? parseInt(searchParams.page) : 1);

//   // Fetch data whenever page or searchParams change
//   const fetchTodos = async (p: number) => {
//     startTransition(async () => {
//       const user = await currentUser();
//       if (!user) return;

//       const { data, count } = await getTodos({ p, queryParams: searchParams });
//       setTodos(data || []);
//       setCount(count || 0);
//     });
//   };

//   useEffect(() => {
//     fetchTodos(page);
//   }, [page, searchParams]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
//       </div>
//     );
//   }

//   if (!todos || todos.length === 0) {
//     return (
//       <div className="container mx-auto p-6 text-center">
//         <p className="text-gray-500 dark:text-gray-400">You have no todos yet. Create one to get started!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-[calc(100vh-8rem)] overflow-y-auto py-4 px-4 md:px-8">
//       <h1 className="text-3xl font-bold mb-6">Your Todos</h1>

//       <div className="space-y-3">
//         {todos.map((todo) => (
//           <div
//             key={todo.id}
//             className="flex flex-col md:flex-row md:gap-4 p-4 rounded-lg border dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm"
//           >
//             <div className="flex gap-3 w-full">
//               <Checkbox className="h-5 w-5 mt-1" />
//               <div className="flex-1 space-y-1">
//                 <h4
//                   className={`text-base font-medium leading-relaxed ${
//                     todo.isCompleted ? "dark:text-gray-400 line-through" : "dark:text-gray-100"
//                   }`}
//                 >
//                   {todo.title}
//                 </h4>
//                 <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-500 dark:bg-slate-900">
//                   <CalendarIcon className="h-3.5 w-3.5" />
//                   <span className="text-xs">
//                     Created {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center justify-end gap-3">
//               <FormModal type="update" id={todo.id} data={todo} />
//               <FormModal type="delete" id={todo.id} data={todo} />
//             </div>
//           </div>
//         ))}
//       </div>

//       <Pagination page={page} count={count} />
//     </div>
//   );
// };

// export default TodoLists;
