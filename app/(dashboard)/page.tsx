import createUser from "@/components/createUser";
import FormModal from "@/components/FormModal";
import TodoLists from "@/components/TodoLists";
import TodoSearch from "@/components/TodoSearch";

export default function Home() {
    // const { user } = useUser()
    // useEffect(() => {
    //     const userCreate = async () => {
    //         try {
    //             await createUser();
    //         } catch (err) {
    //             console.error("Failed to create user:", err);
    //         }
    //     };
    //     userCreate();
    // }, [user]);

    return (
        <div className="max-w-7xl mx-auto bg-transparent px-4 dark:bg-slate-900 dark:text-white dark:border-slate-700">
            <div className=" p-4 mb-2 shadow-md flex items-center justify-between">
                <h1 className="text-xl font-bold">Lists</h1>
                <div className="flex flex-row gap-2">
                    <div className="hidden md:flex">
                        <TodoSearch />
                    </div>
                    <FormModal type="create" />
                    {/* <TodoLists userId={user?.id}/> */}
                </div>
            </div>
            <TodoLists />
        </div>
    );
}
