import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div lang="en" className="dark">
            <Navbar />
            {children}
            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
}
