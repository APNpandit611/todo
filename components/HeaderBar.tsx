import TodoSearch from "./TodoSearch";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import FormModal from "./FormModal";

const HeaderBar = async () => {
    const user = await currentUser();
    const count = await prisma.todo.count({
        where: { userId: user?.id, NOT: { deletedAt: null } },
    });

 
    return (
        <div className="w-full dark:bg-slate-900 dark:border dark:border-slate-700 dark:text-white shadow-md">
            <div className="max-w-7xl mx-auto my-2 sticky top-2 z-50 dark:bg-slate-900 p-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    Lists
                </Link>
                <div className="flex flex-row gap-3">
                    <div className="hidden md:flex">
                        <TodoSearch />
                    </div>
                    <Link
                        href="/bin"
                        className={`h-9 w-9 hover:-translate-y-0.5 hover:transition-all hover:delay-50 cursor-pointer flex items-center justify-center rounded-full bg-purple`}
                    >
                        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
                            <Image
                                src={`/recycleBin.png`}
                                alt=""
                                width={22}
                                height={22}
                            />
                            <div className="bg-red-500 absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white text-xs rounded-full">
                                {count}
                            </div>
                        </div>
                    </Link>

                    <FormModal type="create" />
                    
                    {/* <TodoLists userId={user?.id}/> */}
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
