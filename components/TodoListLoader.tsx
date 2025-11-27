import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const TodoListLoader = async () => {
    const user = await currentUser();
    const count = await prisma.todo.count({
        where: { userId: user?.id },
    });
    return (
        <div className="h-[calc(80hv-4rem)] overflow-y-auto flex flex-col gap-8 mt-8">
            <div className="h-6 w-[180px] bg-gray-300 dark:bg-slate-600 rounded" />
            <div className="flex flex-col gap-5">
                {Array.from({ length: Math.min(count, 5) }).map((_, idx) => (
                    <div
                        key={idx}
                        className="animate-pulse p-4 py-5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 "
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-5 w-5 rounded bg-gray-300 dark:bg-slate 600 "/>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-1/2 bg-gray-300 dark:bg-slate-600 rounded" />
                                <div className="h-3 w-1/3 bg-gray-300 dark:bg-slate-600 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
