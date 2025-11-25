import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Switch from "./ToggleButton";

const Navbar = async () => {
    const user = await currentUser();
    return (
        
        <header className="w-full dark:bg-slate-900 dark:border dark:border-slate-700 dark:text-white shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto sm:px-8 px-4 py-4">
                <div>
                    <Link
                        href="/"
                        className="group flex items-baseline space-x-0.5"
                    >
                        <span className="text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 group-hover:text-indigo-600">
                            TODO
                        </span>
                        <div className="h-[1px] w-full bg-indigo-600 scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></div>
                        <span className="text-lg sm:text-xl font-extralight text-zinc-700">
                            .app
                        </span>
                    </Link>
                </div>

                <div className="flex flex-row items-center justify-between gap-7">
                    {/* <Link href="/history" className="hover:underline text-sm uppercase font-semibold">
                        History
                    </Link> */}
                    {/* <Switch /> */}
                    <div className="flex items-center gap-x-3 md:p-2.5 shadow-md rounded-full md:rounded-md border dark:border-white">
                        <div className="hidden md:flex md:items-center md:gap-3">
                            <div className="flex flex-col text-right">
                                <p className="text-sm font-semibold dark:text-white">
                                    {user?.fullName || "User"}
                                </p>
                                <p className="text-xs text-zinc-500">
                                    Free Plan
                                </p>{" "}
                            </div>
                            <div className="w-px h-8 bg-zinc-300"></div>
                        </div>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-10 h-10 shadow-sm",
                                    userButtonPopoverCard:
                                        "border border-zinc-200 shadow-lg",
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
