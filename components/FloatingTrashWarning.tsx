"use client";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";

const FloatingTrashWarning = () => {
    const [hidden, setHidden] = useState(false);

    if (hidden) return null;

    return (
        <div className="sticky top-0 left-0 right-0 z-50 bg-yellow-100 border-b border-yellow-300 text-yellow-900 px-4 py-2 flex items-center justify-between shadow-sm bg-yellowLight">
            <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <p className="text-sm font-medium">
                    Items in your Recycle Bin will be permanently deleted after 24 hours.
                    Restore any items you still need.
                </p>
            </div>

            <button
                onClick={() => setHidden(true)}
                className="text-yellow-900/70 hover:text-yellow-900 transition"
            >
                ✕
            </button>
        </div>
    );
};

export default FloatingTrashWarning;
