import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import HeaderBar from "@/components/HeaderBar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div lang="en">
            <Navbar />
            <HeaderBar />
            <div className="w-full dark:bg-slate-900 dark:border dark:border-slate-700 dark:text-white">{children}</div>
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
}
