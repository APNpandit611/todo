"use client";
import { useRouter } from "next/navigation";
const ITEM_PER_PAGE = 5;

const Pagination = ({
    page,
    count,
}: {
    page: number | undefined;
    count: number | undefined;
}) => {
    const router = useRouter();
    page = page ?? 1;
    count = count ?? 1;

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set("page", newPage.toString());
        router.push(`${window.location.pathname}?${params}`);
    };

    const getPageNumbers = (currentPage: number, totalPageCount: number) => {
        const page: number[] = [];

        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPageCount, currentPage + 1);

        if (currentPage === 1) end = Math.min(totalPageCount, 3);
        if (currentPage === totalPageCount)
            start = Math.max(1, totalPageCount - 2);

        for (let i = start; i <= end; i++) page.push(i);

        return page;
    };
    const totalPageCount = Math.ceil(count / ITEM_PER_PAGE);
    const pageToShow = getPageNumbers(page, totalPageCount);
    const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
    const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;
    return (
        <div className="py-6 flex items-center justify-between text-gray-500">
            <button
                disabled={!hasPrev}
                className={`py-2 px-4 rounded-md bg-gradient-to-r from-gray-600 to-gray-400 text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`}
                onClick={() => changePage(page - 1)}
            >
                {"<"} Prev
            </button>
            <div className="flex items-center justify-center gap-3 text-sm">
                {pageToShow.map((p) => (
                    <button
                        key={p}
                        className={`px-2 py-1 rounded-sm text-white ${
                            p === page
                                ? "bg-gradient-to-r from-gray-600 to-gray-400"
                                : "bg-slate-300"
                        } cursor-pointer`}
                        onClick={() => changePage(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <button
                disabled={!hasNext}
                onClick={() => changePage(page + 1)}
                className={`py-2 px-4 rounded-md bg-gradient-to-r from-gray-600 to-gray-400 text-xs text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer`}
            >
                Next {">"}
            </button>
        </div>
    );
};

export default Pagination;
